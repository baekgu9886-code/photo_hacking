export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }

    // Vercel 환경 변수에서 안전하게 키를 꺼내 씀 (코드에 직접 안 적음!)
    const apiKey = sk - proj - Q1Q - AG2frL5CjiifU4W_oO1GS6rmA1iRtAh9tajOLlxeT0iOakpsGUSvzaLaUdWEQ3ArJiDWWCT3BlbkFJQrSe9odNykdZnwqe1e8rFuEu0XT - b9BH0ISwkH59AzJpfRj0_NycKCOYoRF - VfAiC6xV9h0kEA;
    if (!apiKey) {
        return res.status(500).json({ error: 'Server API key is not configured' });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "이 사진의 주요 색상, 톤앤매너, 분위기를 분석해줘. 다음 항목별로 이모지와 함께 한글로 깔끔하게 정리해줘:\n1. 🎨 진단 퍼스널 컬러 (봄웜/여름쿨/가을웜/겨울쿨 등 정확한 비율 포함)\n2. 🍀 오늘의 행운 추천 컬러 (HEX 코드 포함)\n3. 💡 이미지 무드 분석 (3문장 이내)\n4. 📸 추천 스타일 & 필터"
                            },
                            {
                                type: "image_url",
                                image_url: { url: image }
                            }
                        ]
                    }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const aiContent = data.choices[0].message.content;
        return res.status(200).json({ result: aiContent });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}