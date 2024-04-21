import "./AddPageModal.scss";

import HorizontalElipsis from "@/assets/interface/HorizontalElipsis";
import { modifyTabAPITemplateId } from "@/api/modifyData";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useAuth } from "@clerk/clerk-react";

type test = {
  template_id: string | undefined;
};

const AddPageModal = () => {
  const params = useParams();
  const id = params.id;
  const { userId } = useAuth();

  const queryClient = useQueryClient();
  
  const { mutateAsync: modifyPageTemplateMutation } = useMutation({
    mutationFn: modifyTabAPITemplateId,
    onSuccess: () => queryClient.invalidateQueries(["tabs"]),
  });

  const modifyPageTemplate = async ({ template_id }: test) => {
    if (!id || !template_id || !userId) return null;
    await modifyPageTemplateMutation({
      id: id,
      template_id: Number(template_id),
      user_id: userId,
    });
  };

  return (
    <div className="add-page-modal">
      <div className="add-page-wrapper">
        <header className="add-page-header">
          <input
            className="add-page_name-input"
            type="text"
            placeholder="Untitled"
          />
        </header>
        <div className="add-page-brand-new-col">
          <span className="add-page-brand-new-col__title">
            Get started with
          </span>
          <ol className="add-page-brand-new">
            <li
              className="add-page-option option-hover-style"
              data-templateid="10"
              onClick={(e) =>
                modifyPageTemplate({
                  template_id: e.currentTarget.dataset.templateid,
                })
              }
            >
              <span>To-do list</span>
            </li>
            <li
              className="add-page-option option-hover-style"
              data-templateid="20"
            >
              <span>Weekly plan</span>
            </li>
            <li
              className="add-page-option option-hover-style"
              data-templateid="30"
            >
              <span>Journal</span>
            </li>
            <li
              className="add-page-option option-hover-style"
              data-templateid="40"
            >
              <span>Table</span>
            </li>
            <li className="add-page-option option-hover-style add-page-option--show-more">
              <HorizontalElipsis />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AddPageModal;
