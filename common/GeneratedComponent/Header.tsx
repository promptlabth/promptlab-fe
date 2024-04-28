import { TFunction } from "i18next"
import { AiFillVideoCamera } from "react-icons/ai";
import { FaClosedCaptioning } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineArticle, MdSell } from "react-icons/md";

interface GeneratedComponentHeader {
  translate: TFunction<"translation", undefined>
  pathname: string
  titlePage: string
  titleDescription: string
}

// Define an object mapping paths to icons
// @Attribute
// icons: An object where each key represents a path and its corresponding value is a JSX.Element representing an icon component.
// The keys are strings representing different paths related to specific functionalities.
// The values are JSX elements, each rendering a different icon component with a specific size (fontSize).
const icons: { [key: string]: JSX.Element } = {
  "/createSellingPost": <MdSell fontSize={96} />,
  "/createIdeaContent": <HiOutlineLightBulb fontSize={96} />,
  "/createArticle": <MdOutlineArticle fontSize={96} />,
  "/createShortVideoScripts": <AiFillVideoCamera fontSize={96} />,
  "/createClickBaitWord": <FaClosedCaptioning fontSize={96} />
};


export const GeneratedComponentHeader = (props: GeneratedComponentHeader) => {
  const { translate, pathname, titlePage, titleDescription } = props
  return (
    <figure className="text-center pt-4 pb-4 text-light">
      <div className="pb-2"> {icons[pathname]} </div>
      <blockquote className="blockquote">
        <p className="display-4 fw-bold">{translate(titlePage)}</p>
      </blockquote>
      <figcaption className="blockquote-footer">
        {translate(titleDescription)}
      </figcaption>
    </figure>
  )
}