const { supabase } = require("../client");
const { v4: uuidv4 } = require("uuid");

const createPost = async (req, res) => {
  let uuid = uuidv4();
  const { title, bulletpoints } = req.body;
  const list = await supabase
    .from("lists")
    .insert([{ title, uuid, bulletpoints }])
    .single();
  const fetchList = await supabase.from("lists").select("*").eq("uuid", uuid);
  res.json(fetchList);
};

const fetchPost = async (req, res) => {
  const uuid = req.params.uuid;
  const list = await supabase.from("lists").select("*").eq("uuid", uuid);
  res.json(list);
};

const updatePost = async (req, res) => {
  const uuid = req.body.uuid;
  const { title, bulletpoints } = req.body;

  const updatedRecord = await supabase
    .from("lists")
    .update([{ title, bulletpoints }])
    .eq("uuid", uuid);
  res.json(updatedRecord);
};

module.exports = {
  createPost,
  fetchPost,
  updatePost,
};
