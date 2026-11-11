export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }

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
            // 토큰이 다 닳았거나 쿼터/잔액 관련 에러일 경우 특별 메시지 송출
            const errMsg = data.error.message || "";
            if (errMsg.includes("quota") || errMsg.includes("billing") || errMsg.includes("exceeded") || data.error.code === "insufficient_quota") {
                return res.status(200).json({
                    quotaExceeded: true,
                    result: "API 키 크레딧이 다 닳아서 에러가 나는데, 새로운 키를 발급받거나 충전할 수 있을까요? (주륵)"
                });
            }
            return res.status(500).json({ error: errMsg });
        }

        const aiContent = data.choices[0].message.content;
        return res.status(200).json({ result: aiContent });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
