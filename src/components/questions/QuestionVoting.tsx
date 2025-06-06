'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { questionsApi } from '@/config/api'
import toast from 'react-hot-toast'

interface QuestionVotingProps {
  questionId: number
  helpfulVotes: number
  notHelpfulVotes: number
  onVoteUpdate?: (helpful: number, notHelpful: number) => void
  className?: string
}

export function QuestionVoting({
  questionId,
  helpfulVotes,
  notHelpfulVotes,
  onVoteUpdate,
  className = ''
}: QuestionVotingProps) {
  const [voting, setVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = async (helpful: boolean) => {
    if (voting || hasVoted) return

    setVoting(true)
    try {
      const result = await questionsApi.vote(questionId, helpful)
      
      if (result.status === 200) {
        setHasVoted(true)
        onVoteUpdate?.(result.helpful_votes, result.not_helpful_votes)
        toast.success('Дауысыңыз есепке алынды!')
      }
    } catch (error) {
      console.error('Error voting:', error)
      toast.error('Дауыс беруде қате орын алды')
    } finally {
      setVoting(false)
    }
  }

  const totalVotes = helpfulVotes + notHelpfulVotes
  const helpfulPercentage = totalVotes > 0 ? (helpfulVotes / totalVotes) * 100 : 0

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">
          Бұл жауап пайдалы болды ма?
        </h4>
        {totalVotes > 0 && (
          <span className="text-xs text-gray-500">
            {totalVotes} дауыс
          </span>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Helpful button */}
        <button
          onClick={() => handleVote(true)}
          disabled={voting || hasVoted}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            hasVoted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Иә</span>
          <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs">
            {helpfulVotes}
          </span>
        </button>

        {/* Not helpful button */}
        <button
          onClick={() => handleVote(false)}
          disabled={voting || hasVoted}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            hasVoted
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500'
          }`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>Жоқ</span>
          <span className="bg-red-200 text-red-800 px-2 py-0.5 rounded-full text-xs">
            {notHelpfulVotes}
          </span>
        </button>
      </div>

      {/* Progress bar */}
      {totalVotes > 0 && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Пайдалы деп санайды</span>
            <span>{Math.round(helpfulPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${helpfulPercentage}%` }}
            />
          </div>
        </div>
      )}

      {hasVoted && (
        <p className="text-xs text-gray-500 mt-2">
          Дауысыңыз үшін рахмет! Бұл бізге жақсырақ қызмет көрсетуге көмектеседі.
        </p>
      )}
    </div>
  )
}
