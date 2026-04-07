import { formatArrayToYMD } from "../utils/formatArrayToLocalDate";
import { formatNepaliDate } from "../utils/NepaliDate";

import imgae from "@/asstest/Image/DashbaordLogo.png";

export const generateStudentPDF = (student: any) => {
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

  const logoPath2 = "./DashboardLogo.png";
  const logoPath =
    "data:image/png;base64,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";
  doc.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Certificate</title>
  <style>
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, html {
    margin: 0; padding: 0;
    width: 210mm; height: 297mm;
    font-family: 'Arial', 'Helvetica', sans-serif;
    background: white;
    overflow: hidden;
  }

.certificate {
  position: relative;
  width: 100%;
  height: 100%;
  // background-image: url('${logoPath2}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #ffffff;
}


  .logo-strong {
    position: absolute; inset: 0;
    background: url('${logoPath2}') center center / 85% auto no-repeat;
    opacity: 0.15; pointer-events: none; z-index: 1;
  }


  
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 2;
}

.top-heading {
  position: absolute;
  top: 1mm;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 190mm;
  z-index: 11;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-logo {
  width: 25mm;           /* Same as your old img width */
  height: 25mm;          /* Adjust if needed for aspect ratio */
  background: url('${logoPath}') center center / contain no-repeat;
  margin-bottom: 8pt;    /* Same spacing as before */
}

  .top-heading .main-title {
    font-size: 48pt;
    font-weight: 900;
    color: #d32f2f;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 0;
    line-height: 1;
  }

  .top-heading .sub-title {
    font-size: 24pt;
    color: #1565c0;
    font-weight: bold;
    letter-spacing: 13px;
    padding: 0 12mm;
    margin: 3pt 0 3pt 0;
  }

 .top-heading .contact-info {
  display: flex;
  flex-direction: row;
  align-items: center;        
  justify-content: center;   
  gap: 22pt;                  
  margin-top: 4pt;          
  font-size: 13pt;
  color: #b71c1c;
  text-align: center;
  line-height: 1.4;
}


.top-heading .contact-info div:nth-child(2) {
  font-size: 12.5pt;
  color: #1565c0;
  font-weight: 500;
}


  .top-heading .address {
    font-size: 14pt;
    color: #1565c0;
    font-weight: bold;
    margin-top: 10pt;
  }

  /* Only restore font-size for text elements — NOT the image */
  .top-heading > div,
  .top-heading > h2 {
    font-size: initial;
  }


  .date-label {
  position: absolute;
  top: 77mm;                
  right: 15mm;                 
  font-size: 14pt;
  font-weight: bold;

  z-index: 12;
  font-family: 'Arial', sans-serif;
}


/* MAIN FORM CONTENT - PERFECTLY CENTERED ON PAGE */
.main-content {
  position: absolute;
  top: 70mm;                    
  left: 50%;
  transform: translateX(-50%);

  padding: 19mm 0mm;
  z-index: 10;
  font-family: 'Arial', sans-serif;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 20pt;
  font-size: 14.5pt;
  font-weight: bold;
  color: #333;
}

.form-row label {
 
  flex-shrink: 0;
  padding-right: 10pt;
}

.underline {
  flex: 1;
  border-bottom: 1.8pt solid #333;
  height: 18pt;
  margin-left: 8pt;
  white-space: nowrap;
}

.small-underline {
  display: inline-block;
  width: 100pt;
  border-bottom: 1.8pt solid #333;
  margin-left: 6pt;
  vertical-align: middle;
}

/* Date on top-right */
.date-label-right {
  position: absolute;
  top: -45mm;                    /* Moves date up above the form */
  right: 15mm;
  font-size: 14.5pt;
  font-weight: bold;
  color: #333;
}
.date-label-right span {
  font-family: 'Courier New', monospace;
  letter-spacing: 3px;
  margin-left: 6px;
}

/* Checkbox rows */
.checkbox-row {
  margin-top: 12pt;
}
.checkbox-group {
  display: flex;
  align-items: center;
  gap: 18pt;
  
  font-weight: normal;
  font-size: 14pt;
}
.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 5pt;
  font-weight: normal;
  width: auto;
  cursor: pointer;
}
.checkbox-group input[type="checkbox"] {
  width: 13pt;
  height: 13pt;
  accent-color: #1565c0;
}

.other-label {
  margin-left: 10pt;
  white-space: nowrap;
}

.education-box {
  margin-top: 20pt;
  border: 2pt solid #000;
  font-size: 12.5pt;
}

.education-title {
  text-align: center;
  font-weight: bold;
  padding: 6pt 0;
  border-bottom: 2pt solid #000;
  letter-spacing: 1px;
}

.education-table {
  width: 100%;
  border-collapse: collapse;
}

.education-table th,
.education-table td {
  border: 1.5pt solid #000;
  padding: 6pt 4pt;
  text-align: center;
  vertical-align: middle;
}

.education-table th {
  font-weight: bold;
}

.education-table td.text-left {
  text-align: left;
}



.signature-section {
  position: absolute;
  bottom: 18mm;               /* distance from bottom of A4 */
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-size: 13.5pt;
   color:black;
  font-weight: bold;
}



.signature-line {
  margin-top: 5pt;
  border-top: 1.8pt solid #000;
  padding-top: 6pt;
}

.counseling {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20pt;              /* equal gap */
  margin-top: 12pt;
  font-size: 10pt;
}

.counseling-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6pt;
}

.counseling-item label {
  font-weight: bold;
  white-space: nowrap;
   font-size:12pt;
}

.counseling-item .underline {
  flex: 1;
  border-bottom: 1.5pt solid #000;
  min-height: 16pt;
  display: inline-block;
}




  @media print {
    body { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }
  }
</style>
</head>
<body>
  <div class="certificate">
    <div class="logo-strong"></div>
    <div class="overlay"></div>

    <div class="top-heading">
     <div class="header-logo"></div>
      <div class="main-title">BABY EDUCATION</div>
      <h2 class="sub-title">Consultancy Pvt. Ltd.</h2>
      <div class="contact-info">
        <div> 01 5922468,01 5922368, 9766845580</div>
        <div>www.babyeducation.com.np</div>
      </div>
      <div class="address">Head office: New Baneshwor, Kathmandu</div>
    </div>
      <div class="date-label">
       Date: ${formatArrayToYMD(student?.createdAt)}
        </div>
         <div class="main-content">


  <div class="form-row">
    <label>Name:</label>
    <div class="underline">${student?.fullName}</div>
  </div>

  <div class="form-row">
    <label>Mobile No.:</label>
    <div class="underline">${student?.mobile}</div>
  </div>

  <div class="form-row">
    <label>Email:</label>
    <div class="underline">${student?.email}</div>
  </div>

  <div class="form-row">
    <label>Address:</label>
    <div class="underline">${student?.currentAddress}</div>
  </div>
  

 <div class="counseling">
  <div class="counseling-item">
    <label>Counseling Mode:</label>
    <span class="underline">${student?.counselingMode || ""}</span>
  </div>

  <div class="counseling-item">
    <label>Counseling Date:</label>
    <span class="underline">
      ${formatArrayToYMD(student?.counselingDate)}
    </span>
  </div>

  <div class="counseling-item">
    <label>Counseling Time:</label>
    <span class="underline">
      ${student?.counselingTime}
    </span>
  </div>
</div>


 <div class="form-row checkbox-row">
  <label>Language Proficiency:</label>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" ${
        student.language?.includes("IELTS") ? "checked" : ""
      }> IELTS
    </label>
    <label>
      <input type="checkbox" ${
        student.language?.includes("PTE") ? "checked" : ""
      }> PTE
    </label>
    <span class="other-label">
      Other: 
      <span class="small-underline">
        ${
          !["IELTS", "PTE"].some((lang) => student.language?.includes(lang))
            ? student.language
            : ""
        }
      </span>
    </span>
  </div>
</div>


  <div class="form-row checkbox-row">
    <label>Preferred Country:</label>
    <div class="checkbox-group">
      <label><input type="checkbox" ${
        student.preferredCountry?.includes("uk") ? "checked" : ""
      }> UK</label>
      <label><input type="checkbox" ${
        student?.preferredCountry?.includes("aus") ? "checked" : ""
      }> AUS.</label>
      <label><input type="checkbox" ${
        student?.preferredCountry?.includes("japan") ? "checked" : ""
      }> Japan</label>
      <span class="other-label">Other: <span class="small-underline">${
        !["japan", "aus", "uk"].some((country) =>
          student.preferredCountry?.includes(country),
        )
          ? student?.preferredCountry
          : ""
      }</span></span>
    </div>
  </div>

<div class="form-row checkbox-row">
  <label>Reference:</label>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" ${
        student.reference?.includes("friends") ? "checked" : ""
      }> Friends
    </label>
    <label>
      <input type="checkbox" ${
        student.reference?.includes("website") ? "checked" : ""
      }> Website
    </label>
    <label>
      <input type="checkbox" ${
        student.reference?.includes("facebook") ? "checked" : ""
      }> Facebook
    </label>
    <label>
      <input type="checkbox" ${
        student.reference?.includes("insta") ? "checked" : ""
      }> Insta
    </label>
    <label>
      <input type="checkbox" ${
        student.reference?.includes("other") ? "checked" : ""
      }> Others
    </label>
   
  </div>
</div>

<div class="education-box">
  <div class="education-title">EDUCATION QUALIFICATION</div>

  <table class="education-table">
    <thead>
      <tr>
        <th style="width:6%">S.N.</th>
        <th style="width:12%">Class</th>
        <th style="width:12%">Year of Passing</th>
        <th style="width:26%">College / University</th>
        <th style="width:18%">Course / Stream</th>
        <th style="width:10%">GPA / Percentage</th>
        
      </tr>
    </thead>

    <tbody>
      ${student?.educationDetails
        ?.map(
          (edu: any, index: number) => `
      <tr>
  <td>${index + 1}</td>
  <td>${
    edu?.educationLevel === "TENTH"
      ? "10th"
      : edu?.educationLevel === "TWELFTH"
        ? "12/Diploma"
        : edu?.educationLevel
  }</td>
  <td>${edu?.yearOfPassing || ""}</td>
  <td class="text-left">${edu?.institutionName || ""}</td>
  <td>${edu?.courseOrStream || ""}</td>
  <td>${edu?.percentageOrGpa || ""}</td>
 
</tr>
      `,
        )
        .join("")}
    </tbody>
  </table>
</div>




</div>
<div class="signature-section">
  <div class="signature-box">
 ${student?.assignee?.firstName} ${
   student?.assignee?.middleName ? student?.assignee?.middleName : ""
 } ${student?.assignee?.lastName}
    <div class="signature-line">Counselling In-Charge Name</div>
  </div>

  <div class="signature-box">
    <div class="signature-line">Authorized Signature</div>
  </div>
</div>

        </div>
      </body>
      </html>
`);

  doc.close();

  iframe.contentWindow?.focus();
  iframe.contentWindow?.print();

  // Remove iframe after printing
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 5000);
};
