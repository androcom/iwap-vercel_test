// src/components/string/stringArtProcessor.tsx

export type Point = [number, number];

interface ApiResponse {
  coordinates: Point[];
}

export const processImageToStringArt = async (imageFile: File): Promise<Point[]> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    // [수정] API 요청 주소를 '/api/v1/string-art'에서 '/api/string'으로 변경합니다.
    const res = await fetch("/api/string", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      try {
        // 백엔드에서 JSON 형태의 에러를 보낼 경우를 대비
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.detail || errorJson.message || `Image conversion failed. (Status: ${res.status})`);
      } catch {
        // JSON 파싱이 실패하면 받은 텍스트를 그대로 에러 메시지로 사용
        throw new Error(errorText || `Image conversion failed. (Status: ${res.status})`);
      }
    }

    const data: ApiResponse = await res.json();

    if (!data.coordinates || data.coordinates.length === 0) {
      throw new Error("Server did not return valid coordinate data.");
    }

    return data.coordinates;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("An unknown error occurred during the API request.");
    }
  }
};