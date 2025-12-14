import { useState } from 'react'
import { FiSettings, FiRotateCcw } from 'react-icons/fi'
import { useAppStore } from '../store/appStore'
import { UserProfile } from '../types'

interface HeaderProps {
  onShowSettings: () => void
}

export default function Header({ onShowSettings }: HeaderProps) {
  const { userProfile, clearIngredients } = useAppStore()
  const [showMenu, setShowMenu] = useState(false)

  const handleResetProfile = () => {
    if (window.confirm('Are you sure? This will reset your preferences.')) {
      clearIngredients()
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧊</span>
          <h1 className="text-2xl font-bold text-dark">FridgeChef</h1>
        </div>

        <div className="flex items-center gap-4">
          {userProfile && (
            <div className="hidden sm:flex text-sm text-gray-600">
              <span className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium">
                {userProfile.skillLevel}
              </span>
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              title="Settings"
            >
              <FiSettings size={24} className="text-dark" />
            </button>

            {showMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden w-48">
                <button
                  onClick={() => {
                    onShowSettings()
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-all font-medium text-dark"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleResetProfile}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 transition-all font-medium text-red-600 flex items-center gap-2"
                >
                  <FiRotateCcw size={16} /> Reset All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
