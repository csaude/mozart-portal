import { useState } from "react";
import { json, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import ListSubmissions from "../component/Submission/SubmissionList";
import NewSubmission from "../component/Submission/NewSubmission";
import SubmissionProvider from "../store/SubmissionProvider";
import { getAuthToken } from "../util/AuthToken";
import { refreshActions } from "../store/refresh-slice";

function Submission() {
  const [addSumissionIsShow, setAddSumissionIsShow] = useState(false);
  const dispatch = useDispatch();

  const showAddSubmissionHandle = () => {
    setAddSumissionIsShow(true);
  };

  const hideAddSubmissionHandle = () => {
    setAddSumissionIsShow(false);
    dispatch(refreshActions.toggle());
  };

  return (
    <SubmissionProvider>
      <ListSubmissions onShowAddSubmission={showAddSubmissionHandle} />
      {addSumissionIsShow && (
        <NewSubmission onClose={hideAddSubmissionHandle} />
      )}
    </SubmissionProvider>
  );
}

export default Submission;

export async function action({ request }) {
  const data = await request.formData();
  const submissionData = {
    id: data.get("id"),
    year: data.get("ano"),
    quarter: data.get("periodo"),
    partner: data.get("parceiro"),
    fileName: data.get("ficheiro"),
    password: data.get("password"),
  };

  if (data.get("id") === "") {
    submissionData["id"]=0;
    const response = await fetch("https://mozart.fgh.org.mz/api/v1/submission", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + getAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (response.status === 404) {
      return redirect("/");
    }

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }
  } else {
    const response = await fetch("https://mozart.fgh.org.mz/api/v1/submission", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + getAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });

    if (response.status === 404) {
      return redirect("/");
    }

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not authenticate user." }, { status: 500 });
    }

    if (response.ok){
      window.location.reload(true);
    }
  }

  return redirect("/submission");
}
