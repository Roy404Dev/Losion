// import { AddPage } from "@/api/addData";
// import { useAuth } from "@clerk/clerk-react";
// import { useState } from "react";
import TemplateIcon from "@/assets/interface/icons/TemplateIcon";

import "./AddPageModal.scss";

import TableIcon from "@/assets/interface/icons/TableIcon";
import MoreIcon from "@/assets/interface/icons/MoreIcon";
import ImportIcon from "@/assets/interface/icons/ImportIcon";
import PageIcon from "@/assets/interface/icons/PageIcon";

const AddPageModal = () => {
  //Empty page code 10
  // const { userId } = useAuth();
  // const [data, setData] = useState({
  //   emoji: "",
  //   name: "",
  //   user_id: userId,
  //   content: "",
  //   template_id: 0,
  // });

  // const addPage = async () => {
  //   if (userId) {
  //     const result = await AddPage({
  //       userId: userId,
  //       name: data.name,
  //       emoji: data.emoji,
  //       template_id: data.template_id,
  //     });
  //     console.log(result);
  //   } else {
  //     console.error("Token is null.");
  //   }
  // };

  //FIX THIS TODO

  return (
    <div className="add-page-modal">
      <div className="add-page-wrapper">
        <header></header>
        <input
          className="add-page_name-input"
          type="text"
          placeholder="Untitled"
        />
        <div
          className="add-page-option add-page-default-options option-hover-style"
          // onClick={addPage}
        >
          <PageIcon />
          <span>Empty Page</span>
        </div>
        <div className="add-page-option add-page-default-options  option-hover-style">
          ✨<span>Start writing with AI...</span>
        </div>
        <span className="information-banner-add-new">Add new</span>
        <ol className="add-page-brand-new">
          <li className="add-page-option option-hover-style">
            <ImportIcon />
            <span>Import</span>
          </li>
          <li className="add-page-option option-hover-style">
            <TemplateIcon />
            <span>Templates</span>
          </li>
          <li className="add-page-option option-hover-style">
            <TableIcon />
            <span>Table</span>
          </li>
          <li className="add-page-option option-hover-style">
            <MoreIcon />
            <span>More</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AddPageModal;
