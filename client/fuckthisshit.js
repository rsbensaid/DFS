<tr ng-repeat='player in players | filter: {name: search_table} | filter: isLessThan | filter: {pos: pos_search} | orderBy:sort.column:sort.descending'>
				<td ng-mouseenter = 'show_player(player.name)' accordion>{{player.name}}
				</td>
				<td>{{player.pos}}</td>
				<td>${{player.price}}</td>
				<td>{{player.h_a}}</td>
				<td>{{player.team}}</td>
				<td>{{player.team_pace}}</td>
				<td>{{((player.team_pace + player.opp_pace) /2 | number: fractionSize: 1)}}</td>
				<td>{{player.opp_pace}}</td>			
				<td>{{player.opp}}</td>
				<td>{{player.opp_rk}}</td>
				<td>{{player.fppg}}</td>
				<td>{{player.mpg}}</td>
				<td>{{player.games}}</td>
			</tr>

			<tr>
			<th>Group</td>
			<th>Split</td>
			<th>FPPG</td>
			<th>MPG</td>
		</tr>
		<tr ng-repeat='split in splits'>
			<td>{{split.group}}</td>
			<td>{{split.split}}</td>
			<td>{{split.fppg}}</td>
			<td>{{split.mpg}}</td>
		</tr>