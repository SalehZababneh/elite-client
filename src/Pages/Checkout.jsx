import React, { useEffect, useState } from "react";
import PageNav from "../Components/PageNav";
import "./checkout.css";
// import REACT_APP_API_URL from "../.env.production"
// import REACT_APP_API_URL from "../.env"
import Product from "../assets/Photos/Product.jpg";
const Checkout = () => {
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  const [customerName, setcustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setstate] = useState("دمشق");
  const [qadmousName, setqadmousName] = useState("");
  const [specificstate, setSpecificstate] = useState("");
  const [qadmousNumber, setqadmousNumber] = useState("");
  const [qadmousBransh, setqadmousBransh] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeExists, setCodeExists] = useState(null);
  const [persentageCode, setPersentageCode] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceAfterCode, setTotalPriceAfterCode] = useState(0);
  const branchMapping = {
    حلب: ["حلـب رئيسي", "الفرقان", "الراموسة"],
    "ريـف دمشق": [
      "قطنا",
      "ضاحية الاسد",
      "القطيفة",
      "دير عطية",
      "يبرود",
      "جديدة عرطوز",
      "النبك",
      "جرمانا",
      "قدسيا مساكن الحرس",
    ],
    طرطوس: [
      "طرطوس رئيسي",
      "المنطقة الصناعية",
      "محطة القدموس",
      "الشيخ بدر",

      "الشيخ سعد",
      "سوق الهال ",
    ],
    اللاذقية: [
      "اللاذقيـة رئيسي",
      "الرمل الشمالي",
      "مشروع الزراعة الجامعة",
      "المحافظة",
      "سقوبين",
      "   القرداحة",
    ],
    حمص: [
      "حمـص - الحضارة",
      "حمص – الزهراء",
      "حمص – الحواش",
      "حمص – شين",
      "حمص – الحمرا",
    ],
    السويداء: ["السويداء"],
    درعا: ["درعا"],
    جبلـة: ["جبلــة رئيسي", "جبلــة – قرية السخابة-رأس العين"],
    بانياس: ["بانيـاس"],
    حماه: ["حمــاه رئيسي", "ساحة العاصي", "سلحب"],
    مصياف: ["مصياف"],
    الحسكة: ["الحسكة"],
    القامشلي: ["القامشلي"],
    السلمية: ["السلمية"],
    // ... other states and their branches
  };
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(existingCart);
  }, []);
  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const checkCodeExists = async () => {
    try {
      console.log("x");
      const response = await fetch(`${REACT_APP_API_URL}/checkCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // setCode(data.code);
        setPersentageCode(data.discountCode.discount);
        setCodeExists(true); // Code exists in the backend
      } else {
        setCodeExists(false); // Code doesn't exist in the backend
      }
    } catch (error) {
      console.error("Error checking code:", error);
      setCodeExists(null); // Error occurred during code check
    }
  };

  useEffect(() => {
    if (codeExists) {
      const discount = parseFloat(persentageCode) || 0;
      const discountedPrice = totalPrice - totalPrice * (discount / 100);
      setTotalPriceAfterCode(discountedPrice);
    } else {
      setTotalPriceAfterCode(totalPrice);
    }
  }, [persentageCode, totalPrice, codeExists]);

  const handlestateChange = (e) => {
    const selectedstate = e.target.value;
    setstate(selectedstate);
    setqadmousBransh("");
  };
  useEffect(() => {
    if (code !== "") {
      checkCodeExists();
    } else {
      setCodeExists(null); // Reset codeExists state when code is empty
    }
  }, [code, codeExists]);

  const checkoutData = {
    customerName: customerName,
    number: Number(phoneNumber),
    state: state,
    specificstate: specificstate,
    nameForKadmous: qadmousName,
    numberForKadmous: Number(qadmousNumber),
    kadmousBransh: qadmousBransh,
    pesentageCode: code,
    totalPrice: totalPrice,
  };
  const productsForCheckout = [];
  cartItems.forEach((item) => {
    const productInfo = {
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
    };
    productsForCheckout.push(productInfo);
  });

  checkoutData.products = productsForCheckout;

  const handleOptionChange = (e) => {
    setqadmousBransh(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(checkoutData);
    setLoading(true);
    try {
      const response = await fetch("http://elitesportswears/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("تمت العملية بنجاح");
        alert("تمت العملية بنجاح");
      } else {
        setcustomerName("");
        setPhoneNumber("");
        // setstate("");
        // setqadmousName("");
        // setqadmousName("");
        // setSpecificstate("");
        // setqadmousNumber("");
        // setqadmousBransh("");
        setCode("");
        setLoading(false);
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error occurred while sending data:", error);
    } finally {
      setLoading(false);
    }
  };
  const branchOptions = branchMapping[state] || [];
  return (
    <>
      <PageNav />

      <div className="shooping-page">
        <div className="shopping-container">
          <div className="pN-pQ">
            <span>المنتج</span>
            <span>الكمية</span>
          </div>

          {cartItems.map((item, index) => (
            <div className="listp-container">
              <div key={index} className="list-of-products">
                <div className="product-img">
                  <img src={`${item.imagePaths}`}  alt="" />
                </div>
                <div className="product-information">
                  <p>{item.name}</p> 
                  <p>السعر</p>
                  {console.log(item.quantity)}
                  <p>{parseInt(item.price) * parseInt(item.quantity)}</p>
                </div>
                <div className="product-quan">{item.quantity}</div> 
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="total-price space">
        <div className="code-container space">
          <span>اضف كود الحسم هنا</span>
          <input
            placeholder="كود الحسم هنا"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              borderColor:
                codeExists === true
                  ? "green"
                  : codeExists === false
                  ? "red"
                  : "",
            }}
          />
        </div>
        <div className="total-befor-code space">
          <span>السعر قبل تطبيق كود الخصم</span>
          <p>{totalPrice}</p>
        </div>
        <div className="total-after-code space">
          <span>السعر بعد تطبيق كود الحسم</span>
          <p>{totalPriceAfterCode}</p>
        </div>
      </div>
      <div className="checkout-container">
        {/* <p className="checkout-heading">Checkout</p> */}
        <p className="checkout-payment-headin">تفاصيل الدفع</p>
        <div className="checkout-form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                required
                type="text"
                id="customerName"
                placeholder="الاسم الكامل"
                value={customerName}
                onChange={(e) => setcustomerName(e.target.value)}
              />
            </div>
            <div>
              <input
                required
                type="number"
                placeholder="+963   "
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="select">
              <label htmlFor="state" className="city">
                المدينة:
              </label>
              <select
                required
                id="state"
                value={state}
                onChange={handlestateChange}
              >
                <option value="دمشق">دمشق</option>
                <option value="ريـف دمشق">ريـف دمشق</option>
                <option value="حلب">حلب</option>
                <option value="اللاذقية">اللاذقية</option>
                <option value="جبلـة">جبلـة</option>
                <option value="طرطوس">طرطوس</option>
                <option value="حمص">حمص</option>
                <option value="السويداء">السويداء</option>
                <option value="درعا">درعا</option>
                <option value="حماه">حماه</option>
                <option value="مصياف">مصياف</option>
                <option value="السلمية">السلمية</option>
                <option value="صافيتا">صافيتا</option>
              </select>
              {state === "دمشق" ? (
                <div className="kadmous-info-container">
                  <input
                    required
                    type="text"
                    placeholder="الموقع بالتفصيل"
                    value={specificstate}
                    onChange={(e) => setSpecificstate(e.target.value)}
                  />
                </div>
              ) : (
                state !== "دمشق" && (
                  <>
                    <div className="kadmous-info-container">
                      <input
                        required
                        type="text"
                        id="qadmousName"
                        placeholder="الاسم الثلاثي للمستلم"
                        value={qadmousName}
                        onChange={(e) => setqadmousName(e.target.value)}
                      />
                    </div>
                    <div className="kadmous-info-container">
                      <input
                        required
                        type="number"
                        id="qadmousName Number"
                        placeholder="رقم المستلم"
                        value={qadmousNumber}
                        onChange={(e) => setqadmousNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      {branchOptions.length > 0 && (
                        <div>
                          <label className="bransh">فرع الاستلام:</label>
                          <select
                            required
                            value={qadmousBransh}
                            onChange={handleOptionChange}
                          >
                            {branchOptions.map((branch) => (
                              <option key={branch} value={branch}>
                                {branch}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <span className="attention">
                        ملاحظة سيتم شحن البضاعة الى القدموس الرجاء اختيار الفراع
                        المناسب
                      </span>
                    </div>
                  </>
                )
              )}
            </div>

            <div className="btn-con">
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "جاري الشراء..." : "شراء"}
              </button>
              <span className="attention">
                      ملاحظة: سيتم الدفع عند الاستلام
                      </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
