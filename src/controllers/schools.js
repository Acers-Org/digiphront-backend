import School from "../models/School.js";

export const getSchools = (req, res) => {
  let schools = [];
  console.log(`All schools in the database`);

  res.status(200).json({
    message: "All schools",
    data: schools,
    success: 1,
  });
};

export const createSchool = async (req, res) => {
  const school = await School.create(req.body);
  res.status(201).json({
    message: "School created",
    data: school,
    success: 1,
  });
};

export const getSchool = (req, res) => {
  let school = {};
  let schoolId = req.params.id;
  res.status(200).json({
    message: "Schools details",
    data: school,
    success: 1,
  });
};

export const updateSchool = (req, res) => {
  const schools = [];
  const school = schools.find((school) => school.id === req.params.id);

  //school.schoolname = req.body.schoolname;

  console.log(`schoolname has been updated to ${req.body.schoolname}.`);
  res.status(200).json({
    message: "Schools details",
    data: school,
    success: 1,
  });
};

export const deleteSchool = (req, res) => {
  console.log(`School with id ${req.params.id} has been deleted`);

  //schools = schools.filter((school) => school.id !== req.params.id);
  res.status(200).send({
    message: "School deleted",
    success: 1,
  });
};
