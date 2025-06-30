

const task = {
    "title": "Develop Landing Page",
    "description": "Create the responsive landing page for the product site.",
    "tags": ["frontend", "marketing"],
    "status": "TODO",
    "createdBy": "666aaa111aaa222aaa333aaa",
    "subTasks": [
      {
        "title": "Design hero section",
        "description": "Design the top section of the landing page in Figma.",
        "status": "TODO",
        "parentTask": null,
        "assignedTo": ["666ddd111ddd222ddd333ddd"]
      },
      {
        "title": "Implement responsive layout",
        "description": "Write CSS and media queries for mobile responsiveness.",
        "status": "TODO",
        "parentTask": null,
        "assignedTo": ["666eee111eee222eee333eee"]
      }
    ],
    "comments": []
  }

const TaskCard = () => {
    return (
        <div>
            <div className="flex items-center gap-2 p-2 bg-dark-900">
                {
                    task.tags.map((tag, idx) => (
                        <p className="text-sm py-2 px-5 bg-dark-700" key={idx}>{tag}</p>
                    ))
                }
            </div>
        </div>
    );
};

export default TaskCard;