"use client"

import {
  Banner,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/shadcn-io/banner"
import { CircleAlert } from "lucide-react"
import { Text } from "@radix-ui/themes"
import React, { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import questions from "../../../quiz-data.json"
import QuizBoard from "@/components/ui/quiz-board/quiz-board"

const Page = () => {
  const [started, setStarted] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [finished, setFinished] = useState<boolean>(false)

  const handleAnswer = (option: string) => {
    setSelectedOption(option)

    const currentQuestion = questions[current]
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1)
    }

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1)
        setSelectedOption("")
      } else {
        setFinished(true)
      }
    }, 1000)
  }

  const restartQuiz = () => {
    setStarted(false)
    setFinished(false)
    setCurrent(0)
    setScore(0)
    setSelectedOption("")
  }

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-start p-6">
      <Banner className="w-full max-w-3xl rounded-xl min-h-[200px] bg-white border border-black shadow-md flex flex-col items-center justify-center text-center p-6 space-y-3">
        <div className="flex items-center gap-2">
          <BannerIcon icon={CircleAlert} className="text-black border-none" />
          <BannerTitle className="text-4xl font-bold text-black">
            Quiz Application
          </BannerTitle>
        </div>
        <Text size="4" color="gray">
          Prepare well Shoaib Bro.
        </Text>
      </Banner>

      <Separator className="my-6 w-full max-w-3xl" />

      {!started ? (
        <Button
          className="text-md py-6 cursor-pointer"
          onClick={() => setStarted(true)}
        >
          Get Started
        </Button>
      ) : finished ? (
        <div className="result-board text-center space-y-4 flex flex-col">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <Text size="5" className="font-medium">
            Your Score: {score} / {questions.length}
          </Text>
          <Text size="4" color="gray">
            Percentage: {((score / questions.length) * 100).toFixed(2)}%
          </Text>
          <Button className="mt-4" onClick={restartQuiz}>
            Restart Quiz
          </Button>
        </div>
      ) : (
        <>
          <div className="quiz-board w-full max-w-3xl">
            <Text className="mb-3 block">
              Score: {score} / {questions.length}
            </Text>
            <QuizBoard
              index={current}
              question={questions[current].question}
              options={questions[current].options}
              id={questions[current].id}
              onAnswer={handleAnswer}
              selectedOption={selectedOption}
              correctAnswer={questions[current].answer}
            />
          </div>
          <Separator className="my-6 w-full max-w-3xl" />
          <Text className="text-gray">@ Originated By Ali Hassan.</Text>
        </>
      )}
    </div>
  )
}

export default Page
