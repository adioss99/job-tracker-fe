const roleCode = { ADMIN: "13qvektx0", USER: "2z6a3ik9w" };

export const roleCodeReverse = { "13qvektx0": "ADMIN", "2z6a3ik9w": "USER" };

export const getAuthId = (userId: string) => {
  const user = roleCode[userId as keyof typeof roleCode] || "2z6a3ik9w";
  const id = user + "" + userId.slice(0, 12);
  return id;
};
