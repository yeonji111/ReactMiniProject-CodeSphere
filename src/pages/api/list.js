import executeQuery from "../../../database";
export default async function handler(req, res) {
  const { url, userid, groupid } = req.body;
  console.log(req.body);

  try {
    switch (url) {
      case "getList":
        const query = `select 
            a.user_id ,b.group_id ,a.user_name ,a.user_field ,a.user_location ,a.user_intro,
            case b.status 
                WHEN '0' THEN '초대대기' 
                WHEN '1' THEN '크루원'
                ELSE ''
              end as status
            from 
                USERS A
            left outer join 
                user_group_mapping B
            on 
                A.user_id = B.user_id
            and 
                B.group_id = 
            (
            select 
                ug.group_id 
            from 
                users u , user_groups ug 
            where 
                u.user_id = ug.group_manager
            and 
                u.user_id = ?)`;

        const result = await executeQuery(query, [userid]); //배열
        // console.log(query);
        // console.log(result);

        if (result.length > 0) {
          // 조회되는 데이터가 있는 경우 정보 넘기기
          res.status(200).json(result);
        } else {
          res.status(200).json("실패");
        }
        break;

      // 초대 등록
      case "inviteGroup":
        const query2 = `insert into user_group_mapping 
          (user_id, group_id, status,create_date)
          VALUES (?,?,'0',now())`;

        const result2 = await executeQuery(query2, [userid, groupid]); //배열
        if (result2.data) {
          res.status(200).json("초대완료");
        } else {
          res.status(200).json("초대실패");
        }
        break;

      // 매니저 권한 체크 및 그룹 아이디
      case "checkManager":
        const query3 = `select group_manager, group_id
        from user_groups 
        where group_manager = ?`;

        console.log(query3);
        const result3 = await executeQuery(query3, [userid]);
        console.log("결과 ====>", result3);
        if (result3.length > 0) {
          res
            .status(200)
            .json({ manager: "권한있음", groupid: result3[0].group_id });
          console.log(result3[0].group_id);
        } else {
          res.status(200).json("권한없음");
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
