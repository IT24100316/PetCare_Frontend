import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { sendMessage, getMessages, markAsRead } from '../api/chatApi';
import { getBookingById } from '../api/bookingApi';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { bookingId, receiverId, receiverName } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('Approved');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef();

  const fetchMessages = async () => {
    try {
      const data = await getMessages(bookingId);
      setMessages(data);
      const booking = await getBookingById(bookingId);
      setBookingStatus(booking.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    markAsRead(bookingId);
    const interval = setInterval(() => {
        fetchMessages();
        markAsRead(bookingId);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      await sendMessage(bookingId, receiverId, text.trim());
      setText('');
      fetchMessages();
    } catch (error) {
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isMine = item.sender === user._id;
    return (
      <View style={[styles.messageRow, isMine ? styles.myRow : styles.theirRow]}>
        <View style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.messageText, isMine ? styles.myText : styles.theirText]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, isMine ? styles.myTime : styles.theirTime]}>
            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#006850" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{receiverName || 'Chat'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#006850" style={{ flex: 1 }} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item._id}
          renderItem={renderMessage}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      )}

      {bookingStatus === 'Approved' ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]} 
              onPress={handleSend}
              disabled={!text.trim() || sending}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.disabledArea}>
          <Ionicons name="lock-closed" size={16} color="#ba1a1a" />
          <Text style={styles.disabledText}>
            This conversation has ended (Booking {bookingStatus}).
          </Text>
        </View>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1a1c1c' },
  list: { padding: 16 },
  messageRow: { marginBottom: 12, maxWidth: '80%' },
  myRow: { alignSelf: 'flex-end' },
  theirRow: { alignSelf: 'flex-start' },
  bubble: { padding: 12, borderRadius: 20 },
  myBubble: { backgroundColor: '#006850', borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: '#f0f0f0', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15 },
  myText: { color: '#fff' },
  theirText: { color: '#1a1c1c' },
  timeText: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myTime: { color: 'rgba(255,255,255,0.7)' },
  theirTime: { color: '#999' },
  inputArea: { 
    flexDirection: 'row', 
    padding: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#eee', 
    alignItems: 'center',
    gap: 8
  },
  input: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 24, 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    maxHeight: 100,
    fontSize: 15
  },
  sendBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#006850', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sendBtnDisabled: { backgroundColor: '#ccc' },
  disabledArea: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#fff1f0', 
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#ffccc7'
  },
  disabledText: { color: '#ba1a1a', fontSize: 13, fontWeight: '600' }
});

export default ChatScreen;
