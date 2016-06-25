var tasks = [
    func1,
    func2,
    func3,
    func4,
    func5
  ];

function next(err, result) {
  if (err) throw err;
  var currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}
next();