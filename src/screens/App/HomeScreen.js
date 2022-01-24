import {YOUTUBE_API_KEY} from '@env';
import React, {useContext, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CLOSE, LIST_EMPTY} from '../../assets';
import Container from '../../components/container';
import {InputText} from '../../components/inputText';
import {AppContext} from '../../context';
import {colors, fonts} from '../../styles';
//import {magic} from '../../utils';

const HomeScreen = () => {
  const {appState, setAppState} = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const [searchResults, dispatchSearchResults] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'initiate':
          return {
            isLoading: true,
            status: null,
            value: null,
          };
        case 'clear':
          return {
            isLoading: false,
            status: null,
            value: null,
          };
        case 'success':
          return {
            isLoading: false,
            status: 'success',
            value: action.response,
          };
        case 'failure':
          return {
            isLoading: false,
            status: 'error',
            value: null,
          };
        default:
          return state;
      }
    },
    {
      isLoading: false,
      status: null,
      value: null,
    },
  );

  const search = async query => {
    dispatchSearchResults({type: 'initiate'});
    try {
      const result = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=25&q=${query}`,
      );
      const response = await result.json();
      dispatchSearchResults({type: 'success', response: response});
    } catch (error) {
      dispatchSearchResults({type: 'failure', response: error});
    }
  };

  const renderSearchItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        const url = `https://www.youtube.com/watch?v=${item.id.videoId}`;
        if (Linking.canOpenURL(url)) {
          Linking.openURL(url);
        }
      }}>
      <View style={styles.resultCard}>
        <Image
          source={{uri: item.snippet.thumbnails.default.url}}
          style={styles.resultCardThumbnail}
          width={item.snippet.thumbnails.default.width}
          height={item.snippet.thumbnails.default.height}
        />
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultCardTitle} numberOfLines={3}>
            {item.snippet.title}
          </Text>
          <Text style={styles.resultCardDescription} numberOfLines={1}>
            {item.snippet.channelTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container paddingHorizontal={0}>
      <View style={styles.header}>
        <Text style={styles.greetingText}>
          Welcome {appState.userEmail || 'User'}!
        </Text>
        <TouchableOpacity
          onPress={async () => {
            // This is not working due to some SDK issue.
            //await magic.user.logout();
            setAppState({
              isLoggedIn: false,
              userEmail: null,
            });
          }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <InputText
          placeholder="Search YouTube"
          value={searchText}
          onChange={value => {
            setSearchText(value);
          }}
          returnKeyType="search"
          onSubmitEditing={() => {
            search(searchText);
          }}
          customTxtInputStyle={{backgroundColor: '#f9f9f9'}}
          customInputStyle={{flex: 7}}
          rightElement={
            searchText.length > 3 ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchText('');
                  dispatchSearchResults({type: 'clear'});
                }}
                style={{flex: 1, alignItems: 'center'}}>
                <Image source={CLOSE} style={styles.closeIcon} />
              </TouchableOpacity>
            ) : undefined
          }
        />
      </View>

      {searchResults.isLoading && (
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator size={'small'} />
        </View>
      )}

      <View style={styles.resultsContainer}>
        <FlatList
          data={
            searchResults.status === 'success' ? searchResults.value.items : []
          }
          renderItem={renderSearchItem}
          keyExtractor={item => item.id.videoId}
          contentContainerStyle={{
            paddingBottom: 300,
          }}
          ListEmptyComponent={
            searchText.length > 3 && searchResults.status === 'success' ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={LIST_EMPTY}
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            ) : undefined
          }
        />
      </View>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingText: {
    fontFamily: fonts.primaryMedium,
    fontSize: 18,
    color: colors.brand282828,
    flex: 6,
  },
  logoutText: {
    fontFamily: fonts.primaryMedium,
    fontSize: 13,
    color: colors.brand282828,
    flex: 2,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  closeIcon: {width: 20, height: 20, opacity: 0.5},
  resultsContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  resultCard: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomColor: colors.greyE5E5E5,
    borderBottomWidth: 1,
  },
  resultCardThumbnail: {flex: 2},
  resultTextContainer: {
    paddingHorizontal: 10,
    flex: 3,
    borderRadius: 2,
  },
  resultCardTitle: {
    fontFamily: fonts.primaryMedium,
    fontSize: 15,
    color: colors.brand282828,
  },
  resultCardDescription: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: colors.brand828282,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  emptyText: {
    fontFamily: fonts.primaryMedium,
    fontSize: 14,
    color: colors.brand828282,
  },
});
