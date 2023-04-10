import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//　未ログインユーザーだけが見れるページに付ける
const PublicRoute = ( props: {children: any} ): any => {
  const { user } = useAuth();
  if (user) {
    // ログインユーザーの場合
    return <Navigate to="/" />;
  }
  return props.children;
};

export default PublicRoute;