import { useState } from "react";

const useFetch = <T = any, R = any>(cb: (...args: any[]) => Promise<R>, formData?: { email: string; password: string; }) => {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);

  async function fn(...args: any[]) {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(formData,...args);
      setData(response);
      setError(null)
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return {data, error, loading, fn}
};

export default useFetch;
