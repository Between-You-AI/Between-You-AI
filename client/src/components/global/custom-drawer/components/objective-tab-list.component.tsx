import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Objective } from 'core/models/objective.type'
import { FC } from 'react'
import ObjectiveTab from './objective-tab.component'
import { ExpandMore } from '@mui/icons-material'
import * as _ from 'lodash'

interface ObjectiveTabListProps {
  objectives: Objective[]
  open: boolean
}

export const ObjectiveTabList: FC<ObjectiveTabListProps> = ({ objectives, open }) => {
  return (
    <List>
      {_.isArray(objectives) &&
        _.map(objectives, objective => (
          <>
            <ObjectiveTab objective={objective} open={open} />
          </>
        ))}
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center'
          }}
        >
          <ExpandMore />
        </ListItemIcon>
        <ListItemText primary='Show more' sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </List>
  )
}
