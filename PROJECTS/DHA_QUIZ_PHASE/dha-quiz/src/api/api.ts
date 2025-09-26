const getQuizData = async () => {
  try {
    const prompt = `
Generate 20 **tough multiple-choice questions** like a **mock test** for the DHA Dubai Health exam.
Requirements for each question:
- Must be unique and different on every request.
- id: number
- question: string
- options: array of 4 strings
- answer: string (must be one of the options)
- Questions should mimic real DHA exam difficulty and topics.
Return the response strictly as a valid JSON array only.
`

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEEPSEEK_AI}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2000,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(errorData?.message || "Cannot get anything.")
    }

    const data = await response.json()
    let content = data?.choices?.[0]?.message?.content

    if (!content) return []

    content = content.replace(/```json|```/g, "").trim()
    content = content
      .replace(/,\s*]/g, "]")
      .replace(/,\s*}/g, "}")
      .replace(/\r?\n/g, " ")

    try {
      return JSON.parse(content)
    } catch (parseError) {
      console.error(
        "Failed to parse JSON from AI, returning empty array",
        parseError
      )
      return []
    }
  } catch (error) {
    console.log("There is an error", error)
    return []
  }
}

export { getQuizData }
