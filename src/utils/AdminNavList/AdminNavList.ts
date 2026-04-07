import {
  FaAd,
  FaLaptopCode,
  FaPassport,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";
import { GrUserSettings, GrUserWorker } from "react-icons/gr";
import { IoVideocamOutline } from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdLanguage,
  MdOutlineContactPhone,
  MdOutlineDashboard,
  MdPersonOutline,
  MdSearchOff,
} from "react-icons/md";
import { PiMicrosoftTeamsLogoLight, PiStudentBold } from "react-icons/pi";
import { UserPermission } from "../GetCurrentUser";
import { FaChalkboardUser } from "react-icons/fa6";
import { RiFontMono, RiTeamLine } from "react-icons/ri";
import { LiaUniversitySolid, LiaUsersSolid } from "react-icons/lia";
import { BiBuildingHouse } from "react-icons/bi";
import { AiFillBook, AiOutlineNotification } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";

const data = UserPermission();

export const AdminNavList = [
  {
    label: "Dashboard",
    id: "dashboard",
    icon: MdOutlineDashboard,
    link: "/admin",
  },
  // {
  //   label: "Dashboard",
  //   id: "userDashboard",
  //   icon: MdOutlineDashboard,
  //   link: "/dashboard",
  // },

  {
    label: "Reception",
    id: "reception",
    icon: FaChalkboardUser,
    link: "/reception",
  },
  {
    label: "Search & Program",
    id: "searchprogram",
    icon: MdSearchOff,
    link: "/search-program",
  },
  {
    label: "Council",
    id: "Council",
    icon: PiStudentBold,
    link: "/council",
  },
  {
    label: "University's",
    id: "university",
    icon: LiaUniversitySolid,
    link: "/universitylist",
  },
  {
    label: "Student",
    id: "student",
    icon: PiStudentBold,
    link: "/student",
    children: [
      {
        label: "Consulting",
        id: "Consulting_student",
        icon: RiTeamLine,
        link: "/student",
      },
      {
        label: "Classes",
        id: "Classes_student",
        icon: AiFillBook,
        link: "/student/classes",
      },
    ],
  },

  {
    label: "Notification",
    id: "notification",
    icon: AiOutlineNotification,
    link: "/notification",
  },
  {
    label: "Access",
    id: "access",
    link: "/permission",
    icon: MdAdminPanelSettings,
    children: [
      {
        label: "permisson",
        link: "/permission",
        id: "permission",
        icon: FaShieldAlt,
      },
      {
        label: "Role",
        link: "/role",
        id: "role",
        icon: FaUserCheck,
      },
    ],
  },
  {
    id: "user",
    label: "User",
    link: "/user",
    icon: GrUserSettings,
    children: [
      {
        label: "Employee",
        id: "employee",
        link: "/user",
        icon: MdPersonOutline,
      },
    ],
  },

  {
    label: "Hostel",
    id: "hostel",
    icon: BiBuildingHouse,
    link: "/hostel/student",
    children: [
      {
        label: "Student",
        id: "hostel_student",
        icon: LiaUsersSolid,
        link: "/hostel/student",
      },
      {
        label: "Staff",
        id: "hostel_staff",
        icon: GrUserWorker,
        link: "/hostel/staff",
      },
    ],
  },

  {
    label: "Web_Mgmt",
    id: "web_Mgmt",
    icon: MdLanguage,
    link: "/hero_section",
    children: [
      {
        label: "Banner_img",
        id: "herosection",
        icon: FaLaptopCode,
        link: "/hero_section",
      },
      {
        label: "Visa",
        id: "visa",
        icon: FaPassport,
        link: "/visa_granted",
      },
      {
        label: "Video",
        id: "video",
        icon: IoVideocamOutline,
        link: "/video",
      },
      {
        label: "Teams",
        id: "teams",
        icon: PiMicrosoftTeamsLogoLight,
        link: "/teams",
      },
      {
        label: " About & Ads",
        id: "about_ads",
        icon: FaAd,
        link: "/about/ads",
      },
      {
        label: "Footer",
        id: "footer",
        icon: RiFontMono,
        link: "/footer",
      },
      {
        label: "Contact",
        id: "contact",
        icon: MdOutlineContactPhone,
        link: "/contact_us",
      },
    ],
  },
];
