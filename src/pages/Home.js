import { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectFrom from "../components/ProjectFrom";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { projects, dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_PROJECTS", payload: json });
      }
    };

    if (user) {
      getAllProjects();
    }
  }, [dispatch, user]);

  return (
    <div className="home container mx-auto py-20 grid grid-cols-3 gap-10">
      <div className="left col-span-2">
        <h2 className=" text-4xl font-medium text-sky-400 mb-10">
          {projects.length < 1 ? "No Projects" : "All Projects"}
        </h2>
        <div className="projects-wrapper flex flex-wrap gap-10">
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>
      <ProjectFrom />
    </div>
  );
};

export default Home;
