import executeQuery from "../../../database";

export default async function handler(req, res) {
  const {
    userid,
    url,
    userpw,
    nickname,
    userpassword,
    username,
    location,
    developmentField,
    introduce,
    gender,
    create_date,
    modify_date,
  } = req.body;

  try {
    switch (url) {
      // 아이디 중복체크
      case "checkIsDuplicated":
        const query = `SELECT * FROM users WHERE user_id = ?`;
        const result = await executeQuery(query, [userid]); //배열
        console.log(query);
        console.log(result);

        if (result.length > 0) {
          res.status(200).json("아이디 중복");
        } else {
          res.status(200).json("아이디 성공");
        }

        break;

      // 로그인 조회
      case "login":
        const query1 = `SELECT * FROM users WHERE user_id = ? and user_pw = ?`;
        const result1 = await executeQuery(query1, [userid, userpw]);
        console.log(query1);
        console.log(result1);
        if (result.length > 0) {
          res.status(200).json("로그인 성공");
        } else {
          res.status(200).json("로그인 실패");
        }
        break;

      // 회원가입 -> DB에 사용자 정보 넣기
      case "insertUser":
        const query2 = `INSERT INTO users (user_id, user_pw, user_name, user_location, user_field, create_date, modify_date) VALUES (?, ?, ?, ?, ?, now(), now())`;
        const result2 = await executeQuery(query2, [
          userid,
          userpassword,
          username,
          location,
          developmentField,
        ]);
        console.log(query2);
        if (result2.affectedRows > 0) {
          res.status(200).json("성공");
        } else {
          res.status(200).json("실패");
        }
        console.log(result2);
        break;

      // 회원 추가 정보 추가 업데이트
      case "updateDetail":
        const query3 = `UPDATE users SET user_nickname = ?, user_intro = ?, user_gender  = ? WHERE user_id = ?`;
        const result3 = await executeQuery(query3, [
          nickname,
          introduce,
          gender,
          userid,
        ]);
        console.log(query3);
        if (result3.affectedRows > 0) {
          res.status(200).json("성공");
        } else {
          res.status(200).json("실패");
        }
        console.log(result3);
        break;
      // 닉네임 중복 체크
      case "checkIsDupleciated":
        const query4 = `SELECT * FROM users WHERE user_nickname = ?`;
        const result4 = await executeQuery(query4, [nickname]);
        console.log(query4);
        console.log(result4);
        if (result4.length > 0) {
          res.status(200).json("닉네임 중복");
        } else {
          res.status(200).json("닉네임 성공");
        }
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
