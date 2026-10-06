const API_BASE = "https://firstesim-api.onrender.com";

const plans={
  "تورکیا": [
    ["10 GB","30 ڕۆژ","IQD 8,500"],["20 GB","30 ڕۆژ","IQD 11,500"],
    ["50 GB","30 ڕۆژ","IQD 23,000"],["Unlimited","3 ڕۆژ","IQD 8,000"],
    ["Unlimited","5 ڕۆژ","IQD 10,000"],["Unlimited","7 ڕۆژ","IQD 11,500"],
    ["Unlimited","10 ڕۆژ","IQD 18,000"],["Unlimited","15 ڕۆژ","IQD 23,000"],
    ["Unlimited","30 ڕۆژ","IQD 28,000"]
  ],

  "ئەڵمانیا":[
    ["1 GB","7 ڕۆژ","IQD 6,500"],
    ["5 GB","30 ڕۆژ","IQD 9,000"],
    ["10 GB","30 ڕۆژ","IQD 12,000"],
    ["20 GB","30 ڕۆژ","IQD 19,000"]
  ],

  "ئەمریکا":[
    ["3 GB","30 ڕۆژ","IQD 10,000"],
    ["10 GB","30 ڕۆژ","IQD 20,000"],
    ["20 GB","30 ڕۆژ","IQD 25,000"]
  ],

  "سعودیە":[
    ["20 GB","30 ڕۆژ","IQD 40,000"],
    ["25 GB","45 ڕۆژ","IQD 60,000"],
    ["50 GB","30 ڕۆژ","IQD 90,000"]
  ],

  "ئیمارات":[
    ["5 GB","30 ڕۆژ","IQD 20,000"],
    ["10 GB","30 ڕۆژ","IQD 25,000"],
    ["Unlimited","10 ڕۆژ","IQD 45,000"]
  ],

  "چین":[
    ["5 GB","30 ڕۆژ","IQD 11,500"],
    ["10 GB","30 ڕۆژ","IQD 20,000"],
    ["20 GB","30 ڕۆژ","IQD 25,000"]
  ],

  "ئیتالیا":[
    ["5 GB","30 ڕۆژ","IQD 12,000"],
    ["10 GB","30 ڕۆژ","IQD 16,000"],
    ["20 GB","30 ڕۆژ","IQD 23,000"]
  ],

  "سوئیسرا":[
    ["5 GB","30 ڕۆژ","IQD 16,000"],
    ["10 GB","30 ڕۆژ","IQD 23,000"],
    ["20 GB","30 ڕۆژ","IQD 31,000"]
  ]
};

const flags={
  "تورکیا":"🇹🇷",
  "ئەڵمانیا":"🇩🇪",
  "ئەمریکا":"🇺🇸",
  "سعودیە":"🇸🇦",
  "ئیمارات":"🇦🇪",
  "چین":"🇨🇳",
  "ئیتالیا":"🇮🇹",
  "سوئیسرا":"🇨🇭"
};


/* =========================
   ژمارەکانی پارەدان
========================= */

const paymentNumbers={
  "FIB":"7506021212",
  "FastPay":"7506021212",
  "Super Qi":"7111649351",
  "QuickPay":"7508107121"
};


let lang=0,
    selectedCountry="",
    selectedPlan=null,
    selectedPay="",
    order=null;


/* =========================
   APP
========================= */

function app(content){
  document.getElementById("app").innerHTML=
    `<div class="page">${content}</div>`;
}


/* =========================
   HOME
========================= */

function showHome(){

  app(`
    <section class="hero">
      <h1>گەشتی بێ سنوور 🌍</h1>
      <p>eSIM ـی خێرا و ئاسان بۆ هەموو جیهان</p>

      <input
        class="search"
        placeholder="گەڕان بە ناوی وڵات..."
        oninput="filterCountries(this.value)"
      >
    </section>

    <div class="section-title">
      <h3>وڵاتە بەناوبانگەکان</h3>
    </div>

    <div id="countryGrid" class="grid">
      ${countryCards()}
    </div>
  `);
}


/* =========================
   COUNTRY CARDS
========================= */

function countryCards(filter=""){

  return Object.keys(plans)
    .filter(c =>
      c.includes(filter) ||
      filter===""
    )
    .map(c => `
      <div
        class="card country-card"
        onclick='showCountry(${JSON.stringify(c)})'
      >

        <div class="flag">
          ${flags[c]||"🌍"}
        </div>

        <b>${c}</b>

        <div class="small">
          ${plans[c].length} پلان
        </div>

      </div>
    `)
    .join("");
}


function filterCountries(v){

  document.getElementById("countryGrid").innerHTML=
    countryCards(v.trim());

}


function showCountries(){

  app(`
    <button
      class="back"
      onclick="showHome()"
    >
      ← گەڕانەوە
    </button>

    <h2>وڵاتەکان</h2>

    <input
      class="search"
      placeholder="گەڕان..."
      oninput="filterCountriesPage(this.value)"
    >

    <div id="countryGrid" class="grid">
      ${countryCards()}
    </div>
  `);

}


function filterCountriesPage(v){

  document.getElementById("countryGrid").innerHTML=
    countryCards(v.trim());

}


/* =========================
   COUNTRY
========================= */

function showCountry(c){

  selectedCountry=c;

  app(`
    <button
      class="back"
      onclick="showCountries()"
    >
      ← وڵاتەکان
    </button>

    <div class="card">

      <div class="flag">
        ${flags[c]||"🌍"}
      </div>

      <h2>${c}</h2>

      <div class="small">
        پلانەکانی eSIM
      </div>

    </div>

    <div>

      ${plans[c].map((p,i)=>`

        <div
          class="plan ${p[0]==="Unlimited"?"unlimited":""}"
        >

          <div>

            <div class="plan-data">
              ${p[0]}
            </div>

            <div class="small">
              ${p[1]}
            </div>

          </div>

          <div class="price">
            ${p[2]}
          </div>

          <button
            class="buy"
            onclick="checkout(${i})"
          >
            کڕین
          </button>

        </div>

      `).join("")}

    </div>
  `);

}


/* =========================
   CHECKOUT
========================= */

function checkout(i){

  selectedPlan=
    plans[selectedCountry][i];

  selectedPay="";

  app(`
    <button
      class="back"
      onclick='showCountry(${JSON.stringify(selectedCountry)})'
    >
      ← گەڕانەوە
    </button>

    <h2>پشتڕاستکردنی کڕین</h2>

    <div class="card">

      <b>
        ${flags[selectedCountry]}
        ${selectedCountry}
      </b>

      <p>
        ${selectedPlan[0]} — ${selectedPlan[1]}
      </p>

      <h2>
        ${selectedPlan[2]}
      </h2>

    </div>

    <h3>شێوازی پارەدان</h3>

    ${pay(
      "🏦",
      "FIB",
      "بانکی فیدرالی عێراق"
    )}

    ${pay(
      "⚡",
      "FastPay",
      "فاست پەی"
    )}

    ${pay(
      "Q",
      "Super Qi",
      "سوپەر کیوای"
    )}

    ${pay(
      "↗",
      "QuickPay",
      "کویک پەی"
    )}

    <button
      class="primary"
      onclick="paymentStep()"
    >
      بەردەوام بە پارەدان
    </button>
  `);

}


/* =========================
   PAYMENT METHOD
========================= */

function pay(icon,name,sub){

  return `
    <div
      class="pay ${selectedPay===name?"active":""}"
      onclick='selectPayment(${JSON.stringify(name)})'
    >

      <div class="pay-icon">
        ${icon}
      </div>

      <div>

        <b>${name}</b>

        <div class="small">
          ${sub}
        </div>

        <div
          style="
            margin-top:6px;
            font-size:16px;
            font-weight:800;
            direction:ltr;
            text-align:right;
          "
        >
          📱 ${paymentNumbers[name]}
        </div>

      </div>

    </div>
  `;

}


function selectPayment(name){

  selectedPay=name;

  checkout(
    plans[selectedCountry].indexOf(selectedPlan)
  );

}


/* =========================
   PAYMENT STEP
========================= */

function paymentStep(){

  if(!selectedPay){

    alert(
      "تکایە شێوازی پارەدان هەڵبژێرە"
    );

    return;
  }


  app(`

    <button
      class="back"
      onclick="checkout(${plans[selectedCountry].indexOf(selectedPlan)})"
    >
      ← گەڕانەوە
    </button>


    <h2>
      پارەدان بە ${selectedPay}
    </h2>


    <!-- ژمارەی پارەدان -->

    <div
      class="card"
      style="
        text-align:center;
        margin:15px 0;
      "
    >

      <div class="small">
        ژمارەی پارەدان
      </div>

      <div
        style="
          font-size:28px;
          font-weight:900;
          direction:ltr;
          margin-top:8px;
        "
      >
        ${paymentNumbers[selectedPay]}
      </div>

      <div
        style="
          margin-top:8px;
        "
      >
        تکایە پارەکە بۆ ئەم ژمارەیە بنێرە
      </div>

    </div>


    <div class="note">

      تکایە زانیارییەکان پڕبکەرەوە
      و دوای پارەدان وێنەی پسوڵەکە باربکە.

      Order ـەکە ڕاستەوخۆ بۆ FirstESIM نێردراوە.

    </div>


    <div class="card">

      <input
        id="customerName"
        class="search"
        placeholder="ناوی کڕیار"
        autocomplete="name"
      >

      <input
        id="customerPhone"
        class="search"
        style="margin-top:10px"
        placeholder="ژمارەی مۆبایل"
        autocomplete="tel"
      >

    </div>


    <div class="upload">

      <b>
        📎 ناردنی پسوڵە
      </b>

      <p class="small">
        PNG / JPG / PDF —
        ئەگەر هێشتا پسوڵە نییە،
        دەتوانیت بەبێ فایل تۆمار بکەیت.
      </p>

      <input
        id="receipt"
        type="file"
        accept="image/*,.pdf"
      >

    </div>


    <button
      id="orderBtn"
      class="primary"
      onclick="createOrder()"
    >
      تۆمارکردنی سەفارش
    </button>

  `);

}


/* =========================
   CREATE ORDER
========================= */

async function createOrder(){

  const customerName=
    document.getElementById("customerName")
      ?.value.trim();

  const customerPhone=
    document.getElementById("customerPhone")
      ?.value.trim();

  const receipt=
    document.getElementById("receipt")
      ?.files?.[0];


  if(!customerName){

    alert(
      "تکایە ناوی کڕیار بنووسە"
    );

    return;
  }


  if(!customerPhone){

    alert(
      "تکایە ژمارەی مۆبایل بنووسە"
    );

    return;
  }


  if(!selectedPay){

    alert(
      "تکایە شێوازی پارەدان هەڵبژێرە"
    );

    return;
  }


  const btn=
    document.getElementById("orderBtn");


  if(btn){

    btn.disabled=true;

    btn.textContent=
      "لە ناردندا...";

  }


  const data=
    new FormData();


  data.append(
    "customerName",
    customerName
  );


  data.append(
    "customerPhone",
    customerPhone
  );


  data.append(
    "country",
    selectedCountry
  );


  data.append(
    "plan",
    `${selectedPlan[0]} — ${selectedPlan[1]}`
  );


  data.append(
    "price",
    selectedPlan[2]
  );


  data.append(
    "payment",
    selectedPay
  );


  if(receipt){

    data.append(
      "receipt",
      receipt
    );

  }


  try{

    const r=
      await fetch(
        `${API_BASE}/api/orders`,
        {
          method:"POST",
          body:data
        }
      );


    const d=
      await r.json();


    if(!r.ok){

      throw new Error(
        d.error||"Order failed"
      );

    }


    order=d.order;


    localStorage.setItem(
      "firstesim_order",
      JSON.stringify(order)
    );


    showOrder();


  }catch(e){

    console.error(e);

    alert(
      "نەتوانرا Order بنێردرێت. تکایە دووبارە هەوڵبدە."
    );


    if(btn){

      btn.disabled=false;

      btn.textContent=
        "تۆمارکردنی سەفارش";

    }

  }

}


/* =========================
   REFRESH ORDER
========================= */

async function refreshOrder(){

  if(!order?.id)return;


  try{

    const r=
      await fetch(
        `${API_BASE}/api/orders/${encodeURIComponent(order.id)}`
      );


    const d=
      await r.json();


    if(!r.ok){

      throw new Error(
        d.error||"Order not found"
      );

    }


    order=d.order;


    localStorage.setItem(
      "firstesim_order",
      JSON.stringify(order)
    );


    showOrder();


  }catch(e){

    alert(
      "نەتوانرا دۆخی Order نوێ بکرێتەوە."
    );

  }

}


/* =========================
   ORDER STATUS
========================= */

function statusText(status){

  const map={

    waiting_payment_check:
      "چاوەڕوانی پشتڕاستکردنەوەی پارەدان",

    payment_confirmed:
      "پارەدان پشتڕاست کرا",

    esim_ready:
      "eSIM ئامادەیە",

    completed:
      "تەواو کرا",

    cancelled:
      "هەڵوەشێنرایەوە"

  };


  return (
    map[status]||
    status||
    "نادیار"
  );

}


/* =========================
   QR URL
========================= */

function qrUrl(order){

  if(!order?.qrUrl)
    return "";


  return order.qrUrl.startsWith("http")
    ? order.qrUrl
    : `${API_BASE}${order.qrUrl}`;

}


/* =========================
   SHOW ORDER
========================= */

function showOrder(){

  if(!order){

    order=
      JSON.parse(
        localStorage.getItem(
          "firstesim_order"
        )||"null"
      );

  }


  if(!order){

    showOrders();

    return;

  }


  const ready=
    order.status==="esim_ready" &&
    order.qrUrl;


  app(`

    <button
      class="back"
      onclick="showOrders()"
    >
      ← سەفارشەکان
    </button>


    <h2>
      سەفارشەکە
    </h2>


    <div class="card">

      <b>
        ${order.id}
      </b>

      <p>
        ${flags[order.country]||"🌍"}
        ${order.country}
      </p>

      <p>
        ${order.plan}
      </p>

      <h3>
        ${order.price}
      </h3>

      <p>
        پارەدان:
        ${order.payment}
      </p>

      <p>
        دۆخ:
        <b>
          ${statusText(order.status)}
        </b>
      </p>

    </div>


    ${
      ready
      ?
      `
        <div class="card">

          <h3>
            📱 QR ـی eSIM
          </h3>

          <img
            src="${qrUrl(order)}"
            alt="eSIM QR Code"
            style="
              display:block;
              width:100%;
              max-width:360px;
              margin:12px auto;
              border-radius:14px;
            "
          >

          <div class="note">

            <b>
              Activation Code:
            </b>

            <br>

            ${order.activationCode||"—"}

          </div>

        </div>
      `
      :
      `
        <div class="status waiting">

          ● ${statusText(order.status)}

        </div>

        <div class="note">

          کاتێک تیمی FirstESIM
          پارەکە پشتڕاست بکات
          و QR Code دابنێت،
          لێرەدا دەردەکەوێت.

        </div>
      `
    }


    <button
      class="primary"
      onclick="refreshOrder()"
    >
      🔄 نوێکردنەوەی دۆخ
    </button>

  `);

}


/* =========================
   ORDERS
========================= */

function showOrders(){

  order=
    JSON.parse(
      localStorage.getItem(
        "firstesim_order"
      )||"null"
    );


  app(`

    <h2>
      سەفارشەکان
    </h2>

    ${
      order
      ?
      `
        <div
          class="card"
          onclick="showOrder()"
        >

          <b>
            ${order.id}
          </b>

          <p>

            ${flags[order.country]||"🌍"}

            ${order.country}

            —

            ${order.plan}

          </p>

          <div class="small">

            ${statusText(order.status)}

          </div>

        </div>
      `
      :
      `
        <div class="card">

          هێشتا هیچ
          سەفارشەیەکت نییە.

        </div>
      `
    }

  `);

}


/* =========================
   PROFILE
========================= */

function showProfile(){

  app(`

    <h2>
      پرۆفایل
    </h2>


    <div class="card">

      <h3>
        FirstESIM
      </h3>

      <p>
        زمان / Language
      </p>

      <button
        class="lang"
        onclick="cycleLanguage()"
      >
        کوردی → English → العربية
      </button>

    </div>


    <div
      class="card"
      style="margin-top:12px"
    >
      💬 پشتگیری بە WhatsApp
    </div>

  `);

}


function cycleLanguage(){

  alert(
    "لە وەشانی دواتردا کوردی، English و العربية بە تەواوی زیاد دەکرێن."
  );

}


/* =========================
   START APP
========================= */

showHome();
