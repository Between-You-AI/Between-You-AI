import { useContext } from "react"
import { AuthContext } from "./auth-context"

export const useAuthContext = () => {
  return useContext(AuthContext)
}
