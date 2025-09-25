"use client"
import { Button } from "@/components/ui/button"
import React from "react"

interface QuizBoardProps {
  id: number
  index: number
  question: string
  options: string[]
  onAnswer: (option: string) => void
  selectedOption: string
  correctAnswer: string
}

const QuizBoard = ({
  id,
  index,
  question,
  options,
  onAnswer,
  selectedOption,
  correctAnswer,
}: QuizBoardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm ">
      <h2 className="font-semibold text-lg mb-3">
        {index + 1}. {question}
      </h2>
      <div className="flex flex-col gap-2">
        {options.map((op, idx) => {
          let extraClass = ""
          if (selectedOption) {
            if (op === correctAnswer) {
              extraClass = "bg-green-500 text-black"
            } else if (op === selectedOption) {
              extraClass = "bg-red-500 text-black"
            }
          }
          return (
            <Button
              key={idx}
              variant="outline"
              className={`justify-start ${extraClass}`}
              onClick={() => onAnswer(op)}
              disabled={!!selectedOption}
            >
              {op}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default QuizBoard
