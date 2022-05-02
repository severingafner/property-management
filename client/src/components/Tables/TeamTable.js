import React from 'react'
import { Link } from "react-router-dom"
import {
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableFooter,
  TableContainer,
  Pagination,
  Button,
  Input
} from '@windmill/react-ui'
import { TrashIcon } from '../../icons'
import RoleBadge from '../RoleBadge'

function Header() {
  return (
    <TableHeader>
      <tr>
        <TableCell className="w-24 text-center">Active</TableCell>
        <TableCell className="">Name</TableCell>
        <TableCell className="">Role</TableCell>
        <TableCell className="w-24"></TableCell>
      </tr>
    </TableHeader>
  )
}

function Body({activeTeam, dataTable, onAction}) {
  return (
    <TableBody>
      {dataTable.map((team, i) => (
        
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center justify-center">
              <Input type="checkbox" 
                checked={!!activeTeam && (activeTeam === team.id)}
                disabled={!!activeTeam && (activeTeam === team.id)} 
                onChange={() => {onAction(team, 'activeTeam')}}
              />
            </div>
          </TableCell>
          <TableCell>
            <Link to={"/app/teams/" + team.id}>
              <div className="flex items-center text-sm">
                <p className="font-semibold text-purple-600">{team.name}</p>
              </div>
            </Link>
          </TableCell>
          <TableCell>
            <RoleBadge role={team.role} />
          </TableCell>
          <TableCell>
            {team.role === 'teamOwner' &&
              <Button layout="link" size="icon" aria-label="Delete" onClick={(e) => {e.preventDefault(); onAction(team, 'deleteTeam')} }>
                <TrashIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            }
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default function TeamTable({user, onAction}) {
  return (
    <>
      <TableContainer className="mb-8">
        <Table>
          <Header />
          <Body activeTeam={user.activeTeam} dataTable={user.teams} onAction={onAction} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={user.teams.length}
            resultsPerPage={user.teams.length}
            onChange={()=>{}}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}
