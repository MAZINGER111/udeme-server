const {
  createSubscriber,
  getSubscribersByStates,
} = require("../services/subscriber");
const nodemailer = require("nodemailer");

const {
  createProject,
  getAllProjects,
  updateProject,
  getProjectById,
  deleteProject,
} = require("../services/project");

const createProjectHandler = async (req, res) => {
  const { title, featuredImage, type, createdBy, body, states } = req.body;

  if (!title || !type || !featuredImage || !createdBy || !body || !states)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const projectOrError = await createProject({
    title,
    featuredImage,
    type,
    createdBy,
    body,
    states,
  });

  const subscribers = await getSubscribersByStates({ states });

  if (subscribers.length > 0 && typeof projectOrError !== "string") {
    // send mail to subscribers
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muzzamil@thecjid.org",
        pass: "lmweszamcwogzfvj",
      },
    });

    const mailOptions = {
      from: "newletter@udeme.africa",
      to: subscribers.map((obj) => obj.email).join(", "),
      subject: projectOrError?.title + " | Udeme",
      html: `
      <h5>${projectOrError?.title}</h5>
      <br/>
     <img src=${
       projectOrError?.featuredImage
     } style="width: 200px; height: 200px;" alt="featured image" />
      <br/>
      <p>
      Click 
     <a href=${
       "https://udeme.africa/project/" + projectOrError?._id
     }>here</a> to view
      </p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  return res.send({
    status: typeof projectOrError !== "string" ? "OK" : "Error",
    project: projectOrError,
  });
};

const getAllProjectsHandler = async (req, res) => {
  const page = req.query.page || 1;
  const isAdmin = req.query.admin || false;
  const postPerPage = 12;

  const { projects, totalCount } = await getAllProjects(
    page,
    postPerPage,
    isAdmin
  );
  const pageCount = Math.round(totalCount / postPerPage);

  return res.json({
    success: true,
    projects,
    pagination: {
      totalCount,
      pageCount,
      currentPage: Number(page),
    },
  });
};

const getProjectHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid project id" });

  const projectOrError = await getProjectById({ id });
  return res.send({
    status: typeof projectOrError !== "string" ? "OK" : "Error",
    project: projectOrError,
  });
};

const updateHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid project id" });

  if (Object.keys(newData).length === 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Please provide data" });

  const projectOrError = await updateProject({ id, newData });

  return res.send({
    status: typeof projectOrError !== "string" ? "OK" : "Error",
    project: projectOrError,
  });
};

const subscribeToProject = async (req, res) => {
  const { email, states } = req.body;

  if (!email || !states || states?.length < 0)
    return res
      .status(406)
      .send({ status: "Error", message: "Empty or incomplete input" });

  const subscriberOrError = await createSubscriber({
    email,
    states,
  });

  return res.send({
    status: typeof subscriberOrError !== "string" ? "OK" : "Error",
    subscriber: subscriberOrError,
  });
};

const deleteProjectHandler = async (req, res) => {
  const { id } = req.params;

  if (!id || id.length !== 24)
    return res
      .status(406)
      .send({ status: "Error", message: "Invalid project id" });

  const deteledInstance = await deleteProject({ id });
  return res.send({
    status: deteledInstance !== 1 ? "Error" : "OK",
    message: deteledInstance !== 1 ? "Project not found" : "Project deleted",
  });
};

module.exports = {
  createProjectHandler,
  getAllProjectsHandler,
  getProjectHandler,
  updateHandler,
  subscribeToProject,
  deleteProjectHandler,
};
