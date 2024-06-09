import { Modal } from "antd";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditData,
  addViewData,
  setModalOpen,
} from "../../redux/features/productsSlice";
import { valueExistsAnyField } from "../../utils/utils";
import { CheckOutlined } from "@ant-design/icons";
import {
  usePostProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateProductModal() {
  const modalOpen = useSelector((state) => state?.product?.modalOpen);
  const editData = useSelector((state) => state?.product?.editData);
  const viewData = useSelector((state) => state?.product?.viewData);
  const variants = useSelector((state) => state?.product?.variants);

  const notify = () => {
    toast.error("Please fill up all field !", {
      position: "top-right",
    });
  };
  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
    });
  };

  const [postProduct, result] = usePostProductMutation();
  const [updateProduct, result2] = useUpdateProductMutation();

  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    type: "",
    origin: "",
    variants: [],
  });
  const [addVariants, setAddVariants] = useState([]);
  const [showVariants, setShowVariants] = useState([]);
  const handleAddSpecification = (data) => {
    setAddVariants((prev) => [...prev, data]);
  };

  const handleRemoveSpecification = (id) => {
    const filtered = addVariants.filter((sp, ind) => sp.variant_id !== id);
    setAddVariants(filtered);
    // console.log(filtered);
  };

  const handleOnchange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });

    // console.log(productData);
  };

  const handleSpecification = (e, index) => {
    // setSpecification((prev) => {
    //   return prev.map((obj, ind) => {
    //     if (ind === index) {
    //       return { ...obj, [e.target.name]: e.target.value };
    //     }
    //     return obj;
    //   });
    // });
  };
  useEffect(() => {
    if (editData) {
      setProductData(editData);
      setShowVariants(editData.variants);
      setAddVariants(editData.variants);
    }
    if (viewData) {
      setProductData(viewData);
      setShowVariants(viewData.variants);
    }
    if (!editData && !viewData) {
      setShowVariants(variants);
    }
  }, [editData, viewData, variants]);

  const handleClose = () => {
    dispatch(addEditData(null));
    dispatch(addViewData(null));
    dispatch(setModalOpen(false));
  };

  const handleSubmit = async () => {
    if (
      !productData.name ||
      !productData.brand ||
      !productData.type ||
      !productData.origin ||
      addVariants.length < 1
    ) {
      notify();

      return;
    }

    try {
      let finalData = { ...productData, variants: addVariants };
      let res = null;
      if (editData) {
        finalData = { ...finalData, _method: "PUT" };
        res = await updateProduct({ data: finalData, id: finalData.id });
        console.log("from edit data");
        if (res?.data?.message) {
          notifySuccess("Successfully product updated");
          setProductData({
            name: "",
            brand: "",
            type: "",
            origin: "",
            variants: [],
          });
          setAddVariants([]);
          dispatch(addEditData(null));
          dispatch(setModalOpen(false));
        }
      } else {
        res = await postProduct({ data: finalData });
        if (res?.data?.message) {
          notifySuccess("Successfully product added");
          setProductData({
            name: "",
            brand: "",
            type: "",
            origin: "",
            variants: [],
          });
          setAddVariants([]);
        }
      }

      console.log("final", res.data, res.error, res, finalData);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("modal", addVariants, productData);
  return (
    <div className="customize-modal">
      <Modal
        centered
        open={modalOpen}
        onOk={() => dispatch(setModalOpen(true))}
        onCancel={handleClose}
        width="fit-content"
        footer={null}
      >
        <h3 className="text-center">Product</h3>
        <div className="top-input-container">
          <div>
            <input
              name="name"
              className="custom-input"
              type="text"
              placeholder="Name"
              value={productData?.name}
              onChange={handleOnchange}
            />
            <input
              name="brand"
              className="custom-input"
              type="text"
              placeholder="Brand"
              value={productData?.brand}
              onChange={handleOnchange}
            />
          </div>
          <div>
            <input
              name="type"
              className="custom-input"
              type="text"
              placeholder="Type"
              value={productData?.type}
              onChange={handleOnchange}
            />
            <input
              name="origin"
              className="custom-input"
              type="text"
              placeholder="Origin"
              onChange={handleOnchange}
              value={productData?.origin}
            />
          </div>
        </div>

        <h5 className="text-center">Variants</h5>
        {showVariants.map((spec, ind) => {
          const exist = valueExistsAnyField(addVariants, "id", spec.id);
          return (
            <div key={ind}>
              <input
                name="color"
                className="custom-input"
                type="text"
                placeholder="Color"
                value={spec?.color}
                onChange={(e) => handleSpecification(e, ind)}
                disabled
              />
              <input
                name="specification"
                className="custom-input specification-input"
                type="text"
                placeholder="Specification"
                value={spec?.specification}
                onChange={(e) => handleSpecification(e, ind)}
                disabled
              />
              <input
                name="size"
                className="custom-input size-input"
                type="text"
                placeholder="Size"
                value={spec?.size}
                onChange={(e) => handleSpecification(e, ind)}
                disabled
              />
              {exist ? (
                <button className="plus_minus mr-5 ">
                  <CheckOutlined style={{ fontSize: "8px", fontWeight: 800 }} />
                </button>
              ) : (
                <button
                  className="plus_minus mr-5 "
                  onClick={() => handleAddSpecification(spec)}
                >
                  +
                </button>
              )}
              <button
                className="plus_minus"
                onClick={() => handleRemoveSpecification(spec.variant_id)}
              >
                -
              </button>
            </div>
          );
        })}
        {!viewData && (
          <div className="buttons-container">
            <CustomButton
              title="Cancel"
              styleName="mr-5"
              onClick={handleClose}
            />
            <CustomButton
              title="Submit"
              disabled={viewData}
              onClick={handleSubmit}
            />
          </div>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default CreateProductModal;
