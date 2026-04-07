import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";

const logoDataUrl = new URL("@/asstest/Image/HostelLogo.png", import.meta.url)
  .href;

export const hostelFormPdf = (student: any) => {
  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" rel="stylesheet">

<style>
  body {
    font-family: 'Noto Sans Devanagari', Arial, Helvetica, sans-serif;
    padding: 30px;
    font-size: 13px;
    color: #000;
    position: relative;
    line-height: 1.5;
  }

  .header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.logoimg {
  width: 100px;
  display: flex;
  justify-content: center;
}

.logoimg img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.company {
  text-align: center;
}

.company h2 {
  color: #d7003a; /* red */
  font-size: 38px;
  margin: 0;
  font-weight: 800;
  letter-spacing: 1px;
}

.company p {
  margin: 2px 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.1;
}

.company p:nth-child(2) {
  color: #1c4c92; /* blue */
}

.company p span{
 color:red;
}

.company p:nth-child(3), 
.company p:nth-child(4)  {
  color: #1c4c92; 
}

  .title {
    text-align: center;
    margin: 25px 0 15px;
  }

  .title span {
    background: #000;
    color: #fff;
    padding: 6px 3px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 15px;
  }

  .photo-box {
    position: absolute;
    top: 165px;
    right: 40px;
  }

  .photo-box img {
    width: 95px;
    height: 120px;
    border: 1px solid #000;
    object-fit: cover;
  }

  .row {
    margin-top: 18px;
  }

  .line {
    display: inline-block;
    border-bottom: 1px solid #000;
    min-width: 250px;
    height: 14px;
    vertical-align: bottom;
  }

  .line.small  { min-width: 120px; }
  .line.medium { min-width: 180px; }
  .line.large  { min-width: 350px; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  table, th, td {
    border: 1px solid #000;
  }

  th, td {
    padding: 6px;
    font-size: 12px;
    text-align: left;
  }

  .signatures {
    display: flex;
    justify-content: space-between;
    margin-top: 45px;
  }

  .page-2 {
    page-break-before: always;
    break-before: page;
    margin-top: 40px;
  }

  .page-2 h3 {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
    color: #b22222;
  }

  .page-2 ol {
    padding-left: 25px;
    line-height: 2.0;
    font-size: 14px;
  }

  .page-2 .signature-box {
    margin-top: 30px;
    text-align: left;
    display :flex;
    justify-content: space-between;
  }

 .block {
  font-size: 20px;
  color: red !important;
   font-weight:700;
}




  @media print {
    body { margin: 0; }


    // .logoimg {

    // background-color: green !important;
    //   -webkit-print-color-adjust: exact;
    //   print-color-adjust: exact;


    // }
    // .header {
    //   background-color: red !important;
    //   -webkit-print-color-adjust: exact;
    //   print-color-adjust: exact;
    // }

  }
</style>
</head>

<body>

  <!-- HEADER -->
<div class="header">
  <div class="logoimg">
    <img src="${logoDataUrl}" />
  </div>

  <div class="company">
    <h2>BABY BOYS HOSTEL PVT. LTD.</h2>
    <p>Putalisadak Dhobidhara Kathmandu (opp. to Islington College)</p>
    <p> <span>Call : </span>9819714568, 9766845580</p>
    <p> <span>Email :</span>  babyboyshostel@gmail.com</p>
  </div>
</div>

  <!-- TITLE -->
  <div class="title">
    <span>Application Form</span> <span class="block">Block ${student?.block}</span>
  </div>

  <!-- PHOTO -->
  <div class="photo-box">
    <img src="${student?.image?.path || ""}" />
  </div>

  <!-- PAGE 1 FORM CONTENT -->
  <div class="row">
    Regd No.: <span class="line small">${
      student?.registrationNumber || ""
    }</span>
  </div>

  <div class="row">
    Student's Name (in English): <span class="line large">${
      student?.studentName || ""
    }</span>
  </div>

  <div class="row">
    Date of Birth: <span class="line medium">${HtmlDateFormat(
      student?.dateOfBirth,
    )}</span>
    &nbsp;&nbsp; Citizenship No.: <span class="line medium">${
      student?.citizenshipNumber || ""
    }</span>
  </div>

  <div class="row">Father's Name: <span class="line large">${
    student?.fatherName || ""
  }</span></div>
  <div class="row">Father's Occupation: <span class="line large">${
    student?.fatherOccupation || ""
  }</span></div>

  <div class="row">
    Contact No (Mobile): <span class="line medium">${
      student?.fatherContactNumber || ""
    }</span>
    &nbsp;&nbsp; Telephone: <span class="line medium">${
      student?.fatherContactNumber || ""
    }</span>
  </div>

  <div class="row">Nationality: <span class="line medium">${
    student?.nationality || ""
  }</span></div>
  <div class="row">Home Address: <span class="line large">${
    student?.homeAddress || ""
  }</span></div>

  <div class="row">
    Local Guardian: <span class="line medium">${
      student?.localGuardian || ""
    }</span>
    &nbsp;&nbsp; Contact No: <span class="line medium">${
      student?.localGuardianContact || ""
    }</span>
  </div>

  <div class="row">Student's Phone No: <span class="line medium">${
    student?.studentMobileNumber || ""
  }</span></div>

  <div class="row">Academic & Technical Qualification: <span class="line medium">${
    student?.academicQualification || ""
  }</span></div>

  <table>
    <thead>
      <tr>
        <th>Institution Name</th>
        <th>Subject</th>
        <th>Degree/Diploma/PCI/SLC</th>
        <th>Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${student?.institutionName || ""}</td>
        <td>${student?.subject || ""}</td>
        <td>${student?.academicQualification || ""}</td>
        <td>${student?.year || ""}</td>
      </tr>
    </tbody>
  </table>

  <div class="row" style="margin-top:20px;">
    Admission Date: <span class="line medium">${HtmlDateFormat(
      student?.admissionDate,
    )}</span>
  </div>

  <div class="signatures">
    <div>Applicant's Signature</div>
    <div>Signature of Hostel In-Charge</div>
  </div>

  <!-- ================= PAGE 2 ================= -->
  <div class="page-2">

    <h3>बेबीवाइज होस्टेल नियमावली</h3>

  <ol style="line-height: 1.9; font-size: 13.5px; padding-left: 22px;">
    <li>विद्यार्थीहरूले होस्टेलका सबै नियमहरू पूर्ण रूपमा पालना गर्नुपर्नेछ ।  
      <br><small>(Students must fully comply with all hostel rules.)</small></li>

    <li>धूम्रपान, मदिरा, लागूऔषध तथा नशालु पदार्थको सेवन पूर्ण रूपमा निषेध छ ।  
      <br><small>(Smoking, alcohol, drugs, and any intoxicating substances are strictly prohibited.)</small></li>

    <li>इलेक्ट्रिक हिटर, इन्डक्सन, हट प्लेट, इलेक्ट्रिक आयरन, कुकिङ्ग हब जस्ता विद्युतीय उपकरणहरू प्रयोग गर्न पाइने छैन ।  
      <br><small>(Use of electrical appliances such as heaters, induction, hot plates, irons, cooking hobs etc. is not allowed.)</small></li>

    <li>मासिक कोठा भाडा तथा मेस शुल्क निर्धारित मितिभित्रै भुक्तानी गर्नुपर्नेछ । ढिलो भुक्तानीमा जरिवाना लाग्न सक्छ ।  
      <br><small>(Monthly room rent and mess fees must be paid by the due date. Late payment may incur a fine.)</small></li>

    <li>होस्टेलको फर्निचर, बेड, कुर्सी, टेबल, झ्याल, ढोका आदिमा कुनै पनि किसिमको क्षति पुर्‍याएमा सोको सम्पूर्ण क्षतिपूर्ति तिर्नुपर्नेछ ।  
      <br><small>(Full cost of repair/replacement must be paid for any damage to furniture, bed, chair, table, windows, doors etc.)</small></li>

    <li>होस्टेलको गेट बन्द समय (सामान्यतया राति १०:०० बजे) पालना गर्न अनिवार्य छ । ढिलो आएमा जरिवाना लाग्न सक्छ ।  
      <br><small>(Hostel gate closing time — usually 10:00 PM — must be strictly followed. Late entry may result in a fine.)</small></li>

    <li>अन्य व्यक्तिलाई (आफन्त/साथी) होस्टेलको कोठामा रात बिताउन दिन वा कोठा सेयर गर्न अनुमति छैन ।  
      <br><small>(Allowing any other person (relatives/friends) to stay overnight or share the room is not permitted.)</small></li>

    <li>होस्टेल परिसरमा ठूलो आवाजमा संगीत बजाउन, नाचगान गर्न वा पार्टी गर्न पाइने छैन ।  
      <br><small>(Playing loud music, dancing, or holding parties in the hostel premises is not allowed.)</small></li>

    <li>अनुशासन विपरीत व्यवहार, झगडा, मारपिट, गालीगलौज गरेमा तुरुन्त निस्कासन हुन सक्नेछ र कुनै फिर्ता रकम दिइने छैन ।  
      <br><small>(Indiscipline, fighting, abuse or violent behavior may result in immediate expulsion with no refund.)</small></li>

    <li>विद्यार्थीले प्रत्येक महिनाको शुल्क सोही महिनाको ७ (सात) तारिखभित्रै तिर्नुपर्नेछ, अन्यथा ढिलो शुल्क दैनिक रु. २५/– को दरले लाग्नेछ ।  
      <br><small>(Monthly fee must be paid by the 7th of each month; otherwise daily late fine of Rs. 25/- will apply.)</small></li>

    <li>छात्रवास छोडेर जानु परेमा निरीक्षकलाई १५ दिन अगाडि सूचना दिनुपर्नेछ । अन्यथा थप १५ दिनको शुल्क बुझाउनुपर्नेछ ।  
      <br><small>(15 days’ prior notice required before vacating; otherwise additional 15 days’ fee will be charged.)</small></li>

    <li>होस्टेलभित्र विद्यार्थीबाट हुने कुनै पनि घटना, दुर्घटना, क्षति, विवाद वा गैरकानुनी कार्यको सम्पूर्ण जिम्मेवारी तथा जोखिम विद्यार्थी स्वयंले वहन गर्नुपर्नेछ । होस्टेल व्यवस्थापनले कुनै पनि जिम्मेवारी वा जोखिम वहन गर्ने छैन ।  
      <br><small>(Any incident, accident, damage, dispute or illegal act caused by the student — full responsibility and risk lies with the student. Hostel management assumes no responsibility or risk whatsoever.)</small></li>


    <li>होस्टेल छोड्ने निर्णय गरेमा कम्तीमा १५ दिन अगाडि लिखित जानकारी दिनुपर्नेछ, नभए १ महिनाको भाडा कट्टी हुनेछ ।  
      <br><small>(At least 15 days’ written notice required when leaving; otherwise one month’s rent will be deducted.)</small></li>

    <li>व्यवस्थापनले आवश्यकता अनुसार समय-समयमा नियमहरू परिवर्तन गर्न सक्नेछ । व्यवस्थापनको अन्तिम निर्णय मान्य हुनेछ ।  
      <br><small>(Management reserves the right to change rules as needed. Management’s final decision is binding.)</small></li>
  </ol>

    <div class="signature-box">
      <p>हस्ताक्षर: _______________________________</p>
      <p>मिति:  <Span class="line medium">${HtmlDateFormat(student?.admissionDate)}</span> </p>
    </div>

  </div>

</body>
</html>
`);

  // doc.close();

  // iframe.contentWindow?.focus();
  // iframe.contentWindow?.print();

  doc.close();

  const win = iframe.contentWindow;
  if (!win) return;

  const images = win.document.images;
  let loaded = 0;

  const tryPrint = () => {
    loaded++;
    if (loaded === images.length) {
      win.focus();
      win.print();
    }
  };

  if (images.length === 0) {
    win.focus();
    win.print();
  } else {
    for (const img of images) {
      if (img.complete) {
        tryPrint();
      } else {
        img.onload = tryPrint;
        img.onerror = tryPrint;
      }
    }
  }

  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 5000);
};
