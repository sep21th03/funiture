import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { IoChatboxOutline, IoClose, IoSend } from 'react-icons/io5'

const messageCache = {};


const ChatBotComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Xin chào! Tôi là chatbot hỗ trợ. Bạn cần giúp đỡ gì?', timestamp: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messageContainerRef = useRef(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }, [messages])

  // Hàm gọi API Flask with caching
  const handleUserMessage = async (message) => {
    // Return cached response if available
    if (messageCache[message]) {
      console.log(`Using cached response for: "${message}"`)
      return messageCache[message]
    }
    
    console.log(`Sending new request for: "${message}"`)
    setLoading(true)
    try {
      const response = await axios.post('https://chatbot.ts-com.vn/ask', {
        question: message,
      })
      const answer = response.data.answer || 'Không có phản hồi từ máy chủ!'
      
      messageCache[message] = answer
      
      setLoading(false)
      return answer
    } catch (error) {
      const errorMsg = 'Có lỗi xảy ra, thử lại sau!'

      messageCache[message] = errorMsg
      
      setLoading(false)
      return errorMsg
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return
    
    const userMessage = inputMessage.trim()
    const now = new Date();
    setMessages(prev => [...prev, { type: 'user', text: userMessage, timestamp: now }])
    setInputMessage('')
    
    // Get bot response
    const botResponse = await handleUserMessage(userMessage)
    
    // Add bot response
    setMessages(prev => [...prev, { type: 'bot', text: botResponse, timestamp: new Date() }])
  }

  return (
    <>
      {!isOpen && (
        <div className='chatbot-toggle' onClick={() => setIsOpen(true)}>
          <IoChatboxOutline size={26} />
        </div>
      )}

      {isOpen && (
        <div className='chatbot-container'>
          <div className='chatbot-header'>
            <span>Trợ lý AI</span>
            <button onClick={() => setIsOpen(false)}>
              <IoClose size={18} />
            </button>
          </div>
          
          <div className='message-container' ref={messageContainerRef}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {message.text}
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            ))}
            
            {loading && (
              <div className="loading">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
          </div>
          
          <form className='input-container' onSubmit={handleSendMessage}>
            <input
              type='text'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder='Nhập tin nhắn của bạn...'
              disabled={loading}
            />
            <button type='submit' disabled={loading || !inputMessage.trim()}>
              <IoSend size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBotComponent