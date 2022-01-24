import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../../components/button';
import Container from '../../components/container';
import {InputText} from '../../components/inputText';
import {AppContext} from '../../context';
import {colors, fonts} from '../../styles';
import {magic, validateEmail} from '../../utils';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [inputError, setInputError] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const {setAppState} = useContext(AppContext);

  return (
    <>
      <magic.Relayer />
      <Container paddingHorizontal={25} customStyle={styles.container}>
        <Text style={styles.headerTextStyle}>Welcome</Text>
        <View style={styles.inputContainer}>
          <InputText
            label="Email"
            placeholder="Enter your Email address"
            errorText={inputError}
            value={email}
            onChange={value => {
              setInputError('');
              setEmail(value);
            }}
          />
          <Button
            onPress={async () => {
              if (validateEmail(email)) {
                setIsAuthorizing(true);
                try {
                  // Token could be stored in async storage and used to reauth user without email
                  const token = await magic.auth.loginWithMagicLink({email});
                  setIsAuthorizing(false);
                  setAppState({
                    isLoggedIn: true,
                    userEmail: email,
                  });
                } catch (err) {
                  setIsAuthorizing(false);
                  setInputError(err);
                }
              } else {
                setInputError('Enter valid Email Address');
              }
            }}
            title="Continue"
            customBtnStyle={{
              backgroundColor: colors.brand282828,
              borderColor: colors.brand282828,
              marginVertical: 20,
            }}
            filled={true}
            textColor={colors.white}
            customTitleStyle={{}}
            textSize={16}
            paddingVertical={12}
            isLoading={isAuthorizing}
          />
        </View>
      </Container>
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  headerTextStyle: {
    fontFamily: fonts.primaryMedium,
    fontSize: 24,
    color: colors.black15080D,
    textAlign: 'center',
    paddingTop: 60,
    paddingBottom: 50,
  },
  inputStyle: {
    fontFamily: fonts.primaryMedium,
    color: colors.black15080D,
  },
});
