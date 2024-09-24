// File: pages/edit-product/[id].js
import { useRouter } from "next/router";
import EditItem from "../../components/EditItem";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EditItem productId={id} />;
};

export default EditProductPage;
