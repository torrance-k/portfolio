import prebuilt1 from "../assets/projects/prebuilt/VisWidgets.png";
import prebuilt2 from "../assets/projects/prebuilt/enrollment-gallery.png";
import prebuilt3 from "../assets/projects/prebuilt/chronabs.png";
import dliDash1 from "../assets/projects/dli-dash/Dashboard.png";
import dliDash2 from "../assets/projects/dli-dash/DLI_Updates_settings.png";
import dliDash3 from "../assets/projects/dli-dash/DLI_Updates_sidebar.png";
import dliDashVid1 from "../assets/projects/dli-dash/LightLevels.mov";
import dliDashVid2 from "../assets/projects/dli-dash/ControllerSetup.mov";
import mezLogin from "../assets/projects/mez/login.png";

type GalleryImage = string | { src: string; caption?: string };
type GalleryVideo = string | { src: string; caption?: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category?: "frontend" | "fullstack";
  images?: GalleryImage[];
  class?: string[];
  video?: GalleryVideo[];
  links?: { demo?: string; repo?: string };
};

export const projects: Project[] = [
  {
    id: "prebuilt-vis",
    title: "Prebuilt Visualizations",
    description:
      "Widgets that visualize student enrollment/attendance trends via filters and groupings.",
    tags: ["Vue", "Vite", "Next.js", "Highcharts"],
    images: [
      {
        src: prebuilt1,
        caption:
          "Reusable explore widgets on display after a launchpad (dashboard) renovation.",
      },
      {
        src: prebuilt2,
        caption: `Enrollment visualization showing the ongoing enrollment of students over a multi-year period. 3) Number of yesterday's enrolled students. 4) Statistical enrollment differences. 5) Year to year trendline. 6) 3 dot menu to print a PDF or download an image of the widget. 7) Explore button to view futher visualizations. Explore more at [Renaissance release notes](https://support.renaissance.com/s/article/Enrollment-Data-Visualizations-1752691194424?language=en_US)`,
      },
      {
        src: prebuilt3,
        caption:
          "Chronic Absence widget and data vizualization. The widget acts as a quick snapshot of a district or schools Chronic Absence rate. The explore button of the widget leads a user to the Chronic Absence data visualization. This data can be viewed via filters of School, Grade Level, Race/Ethnicity, Gender and more. It can also be grouped via School, Grade Level, Demographic, and pre-determined School Group, or by all groupings together.",
      },
    ],
    class: ["object-cover"],
    links: { demo: "/DataVis" },
  },
  {
    id: "dli-dashboard",
    title: "DLI Dashboard",
    description: "Greenhouse lighting controller dashboard and controls.",
    tags: ["Vue", "AWS", "Node-RED"],
    images: [
      {
        src: dliDash2,
        caption:
          "Zone settings page renovation. The goal was to give each control its own space while achieving visual appeal so that any user could easily understand and manipulate their lighting settings.",
      },
      {
        src: dliDash3,
        caption:
          "Side navigation renovation. The icons were updated to better reflect their behavior, and the navigation items were updated and combined in conjuction with a settings page split out for more defined understanding for the user.",
      },
    ],
    video: [
      {
        src: dliDashVid2,
        caption: "Controller setup video created for new user onboarding",
      },
      {
        src: dliDashVid1,
        caption: "Light level recordings during demo light capture",
      },
    ],
    class: ["object-right object-fill"],
    links: { demo: "/DLI" },
  },
  {
    id: "mez",
    title: "Login Page",
    description: "Login Page Redesign",
    tags: ["Angular", "CSS grid"],
    images: [
      {
        src: mezLogin,
        caption:
          "Redesign of app login page using rotated and inverted hue filter",
      },
    ],
    class: ["object-right object-fill"],
    links: { demo: "/Mez" },
  },
];
