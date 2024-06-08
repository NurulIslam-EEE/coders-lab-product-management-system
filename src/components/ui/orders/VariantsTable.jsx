import { CheckOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import {
  incDecStep,
  updateBillingInformation,
  updateVariantsSelected,
} from "../../../redux/features/orderSlice";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { valueExistsAnyField } from "../../../utils/utils";

function VariantsTable() {
  const [selectVariants, setSelectVariants] = useState([]);
  const [productFromDropDown, setProductFromDropDown] = useState({});
  // select
  const [selectOptions, setSelectOptions] = useState([]);

  const variants = useSelector((state) => state.product.variants);
  const selectedProducts = useSelector((state) => state.order.selectedProducts);
  const dispatch = useDispatch();
  const handleStepNo = (inc) => {
    // updated variants that selected
    const sum = selectVariants.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );

    dispatch(updateBillingInformation({ name: "total_quantity", value: sum }));
    dispatch(updateVariantsSelected(selectVariants));
    dispatch(
      updateBillingInformation({ name: "details", value: selectVariants })
    );
    // console.log("sum", sum, selectVariants);
    dispatch(incDecStep(inc));
  };

  const handleSelect = (data) => {
    // selectVariants has variant_id
    const exist = selectVariants.filter((vari) => vari.variant_id === data.id);
    if (exist.length < 1) {
      setSelectVariants((prev) => [
        ...prev,
        { variant_id: data.id, quantity: 1 },
      ]);
    } else if (exist.length > 0) {
      setSelectVariants((prev) =>
        prev.filter((vari) => vari.variant_id !== data.id)
      );
    }
    // console.log("exi", exist, selectVariants, data);
  };
  //   select
  const onChange = (value) => {
    const filtered = selectedProducts.filter((prod) => prod.id === value);
    setProductFromDropDown(filtered[0]);
    console.log(filtered);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    const formated = selectedProducts.map((product) => ({
      value: product.id,
      label: product.name,
    }));

    setSelectOptions(formated);
    // console.log("fffff", formated);
  }, [selectedProducts]);

  // console.log("ttt", selectedProducts);
  return (
    <div>
      <h3 className="text-center">Order (Create)</h3>
      <h3 className="text-center">2- Select Variants</h3>
      {/* previous  */}
      <Select
        showSearch
        placeholder="--- Select Product ---"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={selectOptions}
        style={{
          border: "3px solid #83cbeb",
          borderRadius: "6px",
          width: "200px",
        }}
      />
      <table style={{ width: "700px", marginTop: "5px" }}>
        <thead className="table-head">
          <tr>
            <th>ID</th>
            <th>Color</th>
            <th>Specification</th>
            <th>Size</th>
            <th>Quantity</th>

            <th>Select</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {productFromDropDown?.variants?.map((item) => {
            const exist = valueExistsAnyField(
              selectVariants,
              "variant_id",
              item?.id
            );

            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.color}</td>

                <td>{item.specification}</td>
                <td>{item.size}</td>

                <td style={{ background: "#e8e8e8" }}>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Input"
                    disabled
                    style={{
                      background: "transparent",
                      textAlign: "center",
                      border: "0",
                      width: "100%",
                      padding: "5px 0",
                    }}
                  />
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelect(item)}
                >
                  {exist ? (
                    <CheckOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    "..."
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex-end">
        {" "}
        <CustomButton
          title="Back"
          style={{ padding: "5px 22px", marginTop: "30px" }}
          onClick={() => handleStepNo(false)}
        />
        <CustomButton
          title="Next"
          style={{
            padding: "5px 26px",
            marginLeft: "9px",
            marginTop: "30px",
          }}
          onClick={() => handleStepNo(true)}
        />
      </div>
    </div>
  );
}

export default VariantsTable;
