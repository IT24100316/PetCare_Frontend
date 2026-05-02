import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { getInbox } from '../api/chatApi';

const MessageInboxScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user } = useContext(AuthContext);
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInbox = async () => {
    try {
      const data = await getInbox();
      setInbox(data);
    } catch (error) {
      console.error('Error fetching inbox:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchInbox();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchInbox();
  }, []);

  const renderItem = ({ item }) => {
    const isVet = user.role === 'Vet';
    const otherPartyName = isVet ? item.booking?.userId?.name : 'Veterinarian';
    const petName = item.booking?.petId?.name;
    const time = new Date(item.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Chat', {
          bookingId: item.bookingId,
          receiverId: isVet ? item.booking?.userId?._id : item.lastMessage.sender === user._id ? item.lastMessage.receiver : item.lastMessage.sender,
          receiverName: otherPartyName
        })}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{otherPartyName?.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name}>{otherPartyName}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.lastMsg} numberOfLines={1}>{item.lastMessage.text}</Text>
            {item.unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
          {petName && (
            <View style={styles.petPill}>
              <Ionicons name="paw" size={10} color="#006850" />
              <Text style={styles.petName}>{petName}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#006850" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={fetchInbox}>
          <Ionicons name="refresh" size={24} color="#006850" />
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#006850" style={{ flex: 1 }} />
      ) : inbox.length === 0 ? (
        <View style={styles.empty}>
          <MaterialIcons name="chat-bubble-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No messages yet.</Text>
        </View>
      ) : (
        <FlatList
          data={inbox}
          keyExtractor={item => item.bookingId}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} color="#006850" />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1a1c1c' },
  list: { padding: 8 },
  card: { 
    flexDirection: 'row', 
    padding: 12, 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center'
  },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#00685011', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#00685022'
  },
  avatarText: { fontSize: 20, fontWeight: '800', color: '#006850' },
  content: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '700', color: '#1a1c1c' },
  time: { fontSize: 12, color: '#999' },
  lastMsg: { fontSize: 14, color: '#666', flex: 1, marginRight: 8 },
  badge: { backgroundColor: '#ba1a1a', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  petPill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4, 
    backgroundColor: '#00685008', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 8,
    marginTop: 4
  },
  petName: { fontSize: 11, fontWeight: '600', color: '#006850' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { fontSize: 16, color: '#999', marginTop: 16 }
});

export default MessageInboxScreen;
