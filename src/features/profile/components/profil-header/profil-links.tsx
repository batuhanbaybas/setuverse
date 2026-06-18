interface Props { 
    links: {
        id: string
        label: string
        url: string
    }[]
}



function ProfilLinks({ links }: Props) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
        </li>
      ))}
    </ul>
  )
}

export default ProfilLinks