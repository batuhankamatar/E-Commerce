import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { loginSuccess } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        credentials,
      );

      loginSuccess(response.data);

      toast.success("Hoş geldiniz!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Hata!");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
