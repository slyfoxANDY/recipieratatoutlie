import { useState, useRef, useEffect } from 'react'
import { FiSend, FiArrowLeft } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { chatWithGroq } from '../services/groqService'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface ChatRecipeInterfaceProps {
  onBack: () => void
}

export default function ChatRecipeInterface({ onBack }: ChatRecipeInterfaceProps) {
  const { selectedIngredients, userProfile } = useAppStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMsg: Message = {
      id: '0',
      type: 'ai',
      content: `👋 Welcome to FridgeChef! I'm your AI cooking assistant. I see you have these ingredients: ${selectedIngredients.join(', ') || 'none yet'}\n\nYou can ask me:\n• "What can I make with these ingredients?"\n• "Give me a recipe for..."\n• "I have 20 minutes, what's quick?"\n• Or add more ingredients anytime!`,
      timestamp: new Date(),
    }
    setMessages([welcomeMsg])
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Send to Groq
      const response = await chatWithGroq(input, selectedIngredients, userProfile)

      // Add AI response
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: `❌ Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all"
        >
          <FiArrowLeft /> Back
        </button>
        <h1 className="text-xl font-bold text-dark">FridgeChef AI Chat</h1>
        <div className="w-24 text-right text-sm text-gray-600">
          {selectedIngredients.length} ingredients
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-lg px-4 py-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white text-dark border border-gray-200 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.type === 'user' ? 'text-primary/70' : 'text-gray-400'
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your ingredients... or add more ingredients (comma-separated)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
          >
            <FiSend /> Send
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          💡 Tip: Mention ingredients separated by commas to add them, or ask for recipes directly
        </p>
      </div>
    </div>
  )
}
