import { useEffect, useState, useCallback } from "react";
import type { ApiResponse } from "../types/shared/api.types";
 
const useApi = <T,>(
  url: string,
  method: string = "GET",
  body: object | null = null,
  headers: Record<string, string> = { "Content-Type": "application/json" },
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [apiData, setApiData] = useState<ApiResponse<T> | null>(null);
 
  const fetchApi = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const options: RequestInit = {
        method: method,
        headers: {
          ...headers,
        },
      };
 
      if (body && method !== "GET") {
        options.body = JSON.stringify(body);
      }
 
      const response = await fetch(url, options);
 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
 
      const data: ApiResponse<T> = await response.json();
 
      setApiData(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [url, method, body, headers]);
 
  useEffect(() => {
    fetchApi();
  }, []); // run ONLY ONCE on mount
 
  // Just return fetchApi function to refetch
  const refetch = useCallback(() => {
    return fetchApi();
  }, [fetchApi]);
 
  return { isLoading, isError, apiData, refetch };
};
 
export default useApi;