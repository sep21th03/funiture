import React, { useState, useEffect } from 'react'
import ChatBot from 'react-simple-chatbot'
import axios from 'axios'
import { IoChatboxOutline, IoClose } from 'react-icons/io5' // Thư viện icon

// CSS tùy chỉnh inline
const styles = `
  .chatbot-container {
    position: fixed;
    z-index: 1000000;
    bottom: 20px;
    right: 20px;
    transition: all 0.3s ease;
  }

  .chatbot-header {
    background-color: #3313E8FF;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .chatbot-header button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }

  .chatbot-toggle {
    position: fixed;
    z-index: 1000000;
    bottom: 20px;
    right: 20px;
    background-color: #3313E8FF;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .chatbot-toggle:hover {
    background-color: #3313E8FF;
  }

  .chatbot-container button{
  width: 30px;
  margin-right: 10px;
  }
  .rsc-header {
  display: none;
  }
  .rsc-ts-bubble {
  background: #3313E8FF;
  max-width: 65%;
  }
  .rsc-footer {
  top: 15%;
  bottom: 0;
  }
`

const ChatBotComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Hàm gọi API Flask
  const handleUserMessage = async (message) => {
    setLoading(true)
    try {
      const response = await axios.post('http://127.0.0.1:8000/ask', {
        message: message,
      })
      setLoading(false)
      return response.data.answer || 'Không có phản hồi từ máy chủ!'
    } catch (error) {
      setLoading(false)
      return 'Có lỗi xảy ra, thử lại sau!'
    }
  }

  // Custom Component để hiển thị phản hồi từ API
  const BotResponse = ({ previousValue, steps }) => {
    const [responseMessage, setResponseMessage] = useState('Đang xử lý...')

    useEffect(() => {
      const fetchResponse = async () => {
        const response = await handleUserMessage(previousValue)
        setResponseMessage(response)
      }
      fetchResponse()
    }, [previousValue])

    return <div>{loading ? 'Đang xử lý...' : responseMessage}</div>
  }

  const steps = [
    {
      id: 'welcome',
      message: 'Xin chào! Tôi là chatbot. Bạn khỏe không ?',
      trigger: 'user-input',
    },
    {
      id: 'user-input',
      user: true,
      trigger: 'bot-response',
    },
    {
      id: 'bot-response',
      component: <BotResponse />,
      trigger: 'user-input',
    },
  ]

  return (
    <>
   <style>{styles}</style>

      {!isOpen && (
        <div className='chatbot-toggle' onClick={() => setIsOpen(true)}>
          <IoChatboxOutline size={24} />
</div>
      )}

      {isOpen && (
        <div className='chatbot-container'>
          <div className='chatbot-header'>
            <span>AI chatbot</span>
            <button onClick={() => setIsOpen(false)}>
              <IoClose size={20} />
            </button>
          </div>
          <ChatBot
            steps={steps}
            headerTitle=''
            placeholder='Nhập tin nhắn...'
            botDelay={500}
            width='300px'
            height='400px'
            style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden' }}
          />
        </div>
      )}
    </>
  )
}

export default ChatBotComponent