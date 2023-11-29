const get_Best_DBos = (final_eval_all,fileData,final_DBo_all,setBest_DBos,router) => {
    let sorted_fitness = []

    sorted_fitness = final_eval_all.sort((a, b) => Number(a[4]) - Number(b[4]))
    let worst_candidate = sorted_fitness[1]
    let best_candidates = [
      sorted_fitness[sorted_fitness?.length - 1],
      sorted_fitness[sorted_fitness?.length - 2],
      sorted_fitness[sorted_fitness?.length - 3],
      sorted_fitness[sorted_fitness?.length - 4],
      sorted_fitness[sorted_fitness?.length - 5]
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
    //   router.push("/Screen3")
    }, 1000)
  }

  module.exports = get_Best_DBos;