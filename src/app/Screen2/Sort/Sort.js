import { StateContext } from "../../StateProvider"
import React from "react"
import { useRouter } from "next/navigation"

const Sort = () => {
    const router = useRouter()
  const {
    final_DBo_all,
    final_eval_all,
    setBest_DBos,
    fileData
  } = React.useContext(StateContext)
  // console.log(final_eval_all)
  const get_Best_DBos = () => {
    let sorted_fitness = []

    sorted_fitness = final_eval_all.sort((a, b) => Number(a[4]) - Number(b[4]))
    let worst_candidate = sorted_fitness[1]
    let best_candidates = [
      sorted_fitness[sorted_fitness.length - 1],
      sorted_fitness[sorted_fitness.length - 2],
      sorted_fitness[sorted_fitness.length - 3],
      sorted_fitness[sorted_fitness.length - 4],
      sorted_fitness[sorted_fitness.length - 5]
    ]
    //   console.log("Best candidates are",best_candidates);
    let otherDBOs = []
    best_candidates.forEach(element => {
      let temp = ["DBo", "vis_name"]
      fileData[0].forEach(e => {
        temp.push(e)
      })
      let arr = [temp]
      final_DBo_all.find(e => {
        if (e[0] === element[0]) {
          arr.push(e)
        }
      })
      let obj = {
        evalution: element,
        DBo: arr
      }
      otherDBOs.push(obj)
    })
    setBest_DBos(otherDBOs)
    setTimeout(() => {
      router.push("/Screen3")
    }, 1000)
  }
  React.useEffect(() => {
    if (final_DBo_all.length > 0 && final_eval_all.length > 0) {
      get_Best_DBos()
      // console.log(final_DBo_all);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [final_DBo_all, final_eval_all])
  return <></>
}

export default Sort
