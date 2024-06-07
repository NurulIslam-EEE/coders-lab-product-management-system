import { Modal } from "antd";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditData,
  addViewData,
  setModalOpen,
} from "../../redux/features/productsSlice";

function CreateProductModal() {
  const modalOpen = useSelector((state) => state?.product?.modalOpen);
  const editData = useSelector((state) => state?.product?.editData);
  const viewData = useSelector((state) => state?.product?.viewData);

  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    type: "",
    origin: "",
    variants: [],
  });
  const [specification, setSpecification] = useState([
    {
      color: "",
      specification: "",
      size: "",
    },
    {
      color: "",
      specification: "",
      size: "",
    },
    {
      color: "",
      specification: "",
      size: "",
    },
    {
      color: "",
      specification: "",
      size: "",
    },
  ]);
  const handleAddSpecification = () => {
    setSpecification((prev) => [
      ...prev,
      {
        color: "",
        specification: "",
        size: "",
      },
    ]);
  };

  const handleRemoveSpecification = (index) => {
    if (specification.length < 2) {
      return;
    }
    const filtered = specification.filter((sp, ind) => ind !== index);
    setSpecification(filtered);
    // console.log(filtered);
  };

  const handleOnchange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });

    // console.log(productData);
  };

  const handleSpecification = (e, index) => {
    setSpecification((prev) => {
      return prev.map((obj, ind) => {
        if (ind === index) {
          return { ...obj, [e.target.name]: e.target.value };
        }
        return obj;
      });
    });
  };
  useEffect(() => {
    if (editData) {
      setProductData(editData);
      setSpecification(editData.variants);
    }
    if (viewData) {
      setProductData(viewData);
      setSpecification(viewData.variants);
    }
  }, [editData, viewData]);

  const handleClose = () => {
    dispatch(addEditData(null));
    dispatch(addViewData(null));
    dispatch(setModalOpen(false));
    setSpecification([
      {
        color: "",
        specification: "",
        size: "",
      },
      {
        color: "",
        specification: "",
        size: "",
      },
      {
        color: "",
        specification: "",
        size: "",
      },
      {
        color: "",
        specification: "",
        size: "",
      },
    ]);
  };
  //   console.log("modal", editData);
  return (
    <div>
      <Modal
        centered
        open={modalOpen}
        onOk={() => dispatch(setModalOpen(true))}
        onCancel={handleClose}
        width="fit-content"
        footer={null}
      >
        <h5 className="text-center">Product</h5>
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
        {specification.map((spec, ind) => {
          return (
            <div key={ind}>
              <input
                name="color"
                className="custom-input"
                type="text"
                placeholder="Color"
                value={spec?.color}
                onChange={(e) => handleSpecification(e, ind)}
              />
              <input
                name="specification"
                className="custom-input specification-input"
                type="text"
                placeholder="Specification"
                value={spec?.specification}
                onChange={(e) => handleSpecification(e, ind)}
              />
              <input
                name="size"
                className="custom-input size-input"
                type="text"
                placeholder="Size"
                value={spec?.size}
                onChange={(e) => handleSpecification(e, ind)}
              />
              <button
                className="plus_minus mr-5 "
                onClick={handleAddSpecification}
              >
                +
              </button>
              <button
                className="plus_minus"
                onClick={() => handleRemoveSpecification(ind)}
              >
                -
              </button>
            </div>
          );
        })}
        <div className="buttons-container">
          <CustomButton title="Cancel" styleName="mr-5" />
          {!viewData && <CustomButton title="Submit" disabled={viewData} />}
        </div>
      </Modal>
    </div>
  );
}

export default CreateProductModal;
