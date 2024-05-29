import executeQuery from "../../../database";
export default async function handler(req, res) {
  const { userid, url } = req.body;
  console.log(req.body);

  try {
    switch (url) {
      case "getList":
        const query = `select 
                a.user_name ,a.user_field ,a.user_location ,a.user_intro, 
            (
            case b.status 
                WHEN '0' THEN '초대대기' 
                WHEN '1' THEN '크루원'
                ELSE ''
              end
            )as status
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
        console.log(query);
        console.log(result);

        if (result.length > 0) {
          // 조회되는 데이터가 있는 경우 정보 넘기기
          res.status(200).json(result);
        } else {
          res.status(200).json("실패");
        }
        break;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
