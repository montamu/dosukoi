import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//　ログインユーザーだけが見れるページに付ける
const PrivateRoute = ( props: {children: any} ): any => {
  const { user } = useAuth();
  if (!user) {
    // 未ログインユーザーの場合
    return <Navigate to="/signin" />;
  }
  return props.children;
};

export default PrivateRoute;