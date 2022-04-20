Variable.destroy_all

variables = [
  {
    name: "Top 25",
    value: "Nacional",
    icon: "fas fa-medal"
  },
  {
    name: "Angariações",
    value: 0,
    icon: "fas fa-home"
  },
  {
    name: "Volume de Negócios",
    value: 0,
    icon: "fas fa-hand-holding-usd"
  },
]

variables.each do |var|
  Variable.create(var)
end
