const vscode = require('vscode')
const util = require('./util')

/**
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(document, position, token, context) {
	const line = document.lineAt(position)
	const lineText = line.text.substring(0, position.character)
	let str = lineText.substring(lineText.length - 1, lineText.length)

	let dependencies = []
	if (str != '.' && lineText.indexOf('//') == -1 && /(\b\w+\.\w+$|\b\w+\.$)/g.test(lineText) == false) {
		dependencies = [
				'true',
				'false',
				'none',
				'loc',
				'foe',
				'item',
				'harvest',
				'pickup',
				'armor',
				'buffs',
				'debuffs',
				'hp',
				'maxhp',
				'maxarmor',
				'pos',
				'ai',
				'face',
				'key',
				'res',
				'player',
				'totalgp',
				'rng',
				'rngf',
				'input',
				'screen',
				'sys',
				'stonescript',
				'summon',
				'time',
				'totaltime',
				'utc',
				'activate',
				'brew',
				'equip',
				'equipL',
				'equipR',
				'loadout',
				'var',
				'func',
				'return',
				'for',
				'import',
				'new',
				'disable',
				'enable',
				'play',
				'ambient',
				'draw',
				'int',
				'math',
				'music',
				'storage',
				'string',
				'te',
				'ui',
				'color',
				'button',
				{ name: 'Type()', snippet: 'Type($0)', type: vscode.CompletionItemKind.Function },
				{ name: 'ascii ... asciiend', snippet: 'ascii $0 asciiend', type: vscode.CompletionItemKind.Keyword },
				// Resources
				'potion',
				'empty',
		]
	}

	if (/\bkey *(=|!) *(\w+)?$/g.test(lineText)) {
		dependencies = [
			'left',
			'right',
			'up',
			'down',
			'primary',
			'back',
			'ability1',
			'ability2',
			'bumpL',
			'bumpR',
			'leftBegin',
			'rightBegin',
			'upBegin',
			'downBegin',
			'primaryBegin',
			'backBegin',
			'ability1Begin',
			'ability2Begin',
			'bumpLBegin',
			'bumpRBegin',
			'leftEnd',
			'rightEnd',
			'upEnd',
			'downEnd',
			'primaryEnd',
			'backEnd',
			'ability1End',
			'ability2End',
			'bumpLEnd',
			'bumpREnd',
			'←',
			'→',
			'↑',
			'↓',
			'A',
			'D',
			'W',
			'S',
			'LMB',
			'Return',
			'X',
			'Shift',
			'Control',
			'Z',
			'C',
		]
	}

	if (/\bfoe *(=|!) *(\w+)?$/g.test(lineText)) {
		dependencies = [
			// Enemies
			'target',
			'waypoint',
			'acronian_scout',
			'dysangelos',
			'dysangelos_bearer',
			'dysangelos_elementalist',
			'dysangelos_perfected',
			'scarab',
			'flesh_scarab',
			'mosquito',
			'huge_mosquito',
			'wasp',
			'wasp_nest',
			'tree_boss',
			'poena',
			'tiny_spider',
			'small_spider',
			'spider_eggs',
			'small_bat',
			'medium_bat',
			'scorpion',
			'cool_bat',
			'spider_boss',
			'ant',
			'ant_hill',
			'epic_snail',
			'colossal_snail',
			'fluff',
			'mushroom_boss',
			'mushroom_boss_fat',
			'mushroom_boss_skinny',
			'ghost',
			'large_ghost',
			'ghost_tomb',
			'small_skeleton',
			'large_skeleton',
			'ghost_tomb',
			'pallas',
			'skeleton_boss',
			'skeleton_boss_stage_2',
			'mine_walker',
			'fire_elemental',
			'flame_geyser',
			'slave_master',
			'big_slave_master',
			'bomb_cart',
			'bronze_guardian',
			'ice_elemental_elite',
			'pillar',
			'ice_pillar',
			'ki_eater',
			'ki_slerper',
			'ki_globbler',
			'elite',
			'ice_elemental_elite',
			'yeti',
			'slying_serpent',
			'ground_serpent',
			'worm_rider',
			'cult_guard',
			'cult_sorcerer',
			'cult_marksman',
			'heavy_hitter',
			'poison_adept',
			'acronian_cultist',
			'nagaraja',
			// Search filters
			'arachnid',
			'serpent',
			'insect',
			'machine',
			'humanoid',
			'elemental',
			'boss',
			'phase1',
			'phase2',
			'phase3',
			'spawner',
			'flying',
			'slow',
			'ranged',
			'explode',
			'swarm',
			'unpushable',
			'undamageable',
			'magic_resist',
			'magic_vulnerability',
			'immune_to_stun',
			'immune_to_ranged',
			'immune_to_debuff_damage',
			'immune_to_physical',
		]
	}

	if (/\bloc *(=|!) *(\w+)?$/g.test(lineText)) {
		dependencies = [
			// Locations
			'Rocky',
			'Deadwood',
			'Caves',
			'Waterfall',
			'Mushroom',
			'Halls',
			'Mine',
			'Ridge',
			'Temple',
			'Shop',
			'Gate',
		]
	}

	if (/(\bbuffs\.$|\bbuffs\.\w+$)/g.test(lineText)) {
		dependencies = ['count', 'string', 'oldest']
	}

	if (/(\bdebuffs\.$|\bdebuffs\.\w+$)/g.test(lineText)) {
		dependencies = ['count', 'string', 'oldest']
	}

	if (/buffs.string *(=|!) *(\w+)?$/g.test(lineText)) {
		dependencies = [
			// De/Buffs search filters
			'buff_protection',
			'protection',
			'stun',
			'debuff_dot',
			'dot',
			'debuff_dot_2',
			'debuff_damage',
			'damage',
			'debuff_chill',
			'chill',
			'bardiche',
			'smite',
			'berserk',
			'lucky_crit',
			'crit',
			'lucky_mult',
			'multi',
			'strength',
			'invisibility',
			'vampiric',
			'experience',
		]
	}

	if (/(\bdraw\.$|\bdraw\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Bg()', snippet: 'Bg($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Box()', snippet: 'Box($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Clear()', snippet: 'Clear()', type: vscode.CompletionItemKind.Function },
			{ name: 'GetSymbol()', snippet: 'GetSymbol($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Player()', snippet: 'Player()', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(equip(L|R)?)|(item\.(left|right) *) *(=|!) */g.test(lineText)) {
		dependencies = [
			// Weapons
			'poison',
			'vigor',
			'aether',
			'fire',
			'air',
			'ice',
			'sword',
			'long',
			'wand',
			'talisman',
			'shield',
			'dashing shield',
			'bashing shield',
			'compound shield',
			'bardiche',
			'crossbow',
			'heavy crossbow',
			'repeating crossbow',
			'hammer',
			'heavy hammer',
			'staff',
			'quarterstaff',
			'socketed staff',
			'arm',
			'blade',
			'mask',
			'mind',
			'stones',
			'hatchet',
			'shovel',
			'grappling',
			'hook',
			'stones',
			'runestone',
			'moon',
			'mind',
			'triskelion',
			'fissure',
			'quest',
			'ouroboros',
			'xp',
			'xi',
			'star',
			'sight',
			'shiny',
			'gold'
		]
	}

	if (/brew +/g.test(lineText)) {
		dependencies = [
			'stone',
			'wood',
			'tar',
			'bronze',
			'ki',
		]
	}

	if (/(\bplay )/g.test(lineText)) {
		dependencies = [
			'buy',
			'click',
			'confirm',
			'soul_stone',
			'sword_cast',
			'sword_hit',
			'wand_cast',
			'wand_hit',
			'player_kick',
			'player_punch',
			'stone_throw_cast',
			'stone_throw_hit',
			'grappling_cast',
			'grappling_hit',
			'grappling_idle',
			'hatchet_cast',
			'hatchet_hit',
			'shovel_cast',
			'torch_cast',
			'torch_hit',
			'torch_idle',
			'pickup_stone',
			'pickup_wood',
			'pickup_tar',
			'pickup_success',
			'soul_stone_drop',
			'wand_drop',
			'key_drop',
			'cross_deadwood_bump',
			'cross_deadwood_row',
			'cross_deadwood_splash',
			'ui_starfirst',
			'ui_starnew',
			'ui_starold1',
			'ui_starold2',
			'ui_starold3',
			'ui_starold4',
			'bronze_gate_open',
			'prompt_choice',
			'waterfall_hook_hit',
			'waterfall_splash',
			'haunted_gate_key_bounce_1',
			'haunted_gate_key_bounce_2',
			'haunted_gate_key_bounce_3',
			'haunted_gate_opening',
			'haunted_gate_point_lost',
			'haunted_gate_key_into_gate',
			'haunted_gate_shuffle',
			'haunted_gate_shuffle_fast',
			'haunted_gate_torch_off',
			'haunted_gate_torch_on',
			'haunted_gate_try_to_open',
			'paint_splat',
			'waterfall_land',
			'waterfall_rope_grab',
			'waterfall_rope_swing',
			'skeleton_boss_death',
			'skeleton_boss_legs_die',
			'spider_boss_death',
			'tree_boss_death',
			'mushroom_boss_death',
			'tree_boss_attack',
			'tree_boss_awake',
			'tree_boss_idle',
			'tree_boss_spike',
			'spider_boss_attack',
			'player_hit',
			'mushroom_boss_awake',
			'mushroom_boss_punch',
			'mushroom_boss_shoot',
			'skeleton_boss_arm1',
			'skeleton_boss_arm2',
			'skeleton_boss_attack',
			'skeleton_boss_idle',
			'skeleton_boss_bone_bounce',
			'skeleton_boss_arm_woosh',
			'equip',
			'unequip',
			'bat_attack_small',
			'bat_death_small',
			'bat_wing',
			'bat_wing_small',
			'spider_attack',
			'spider_death',
			'spider_death_small',
			'spider_eggs_spawn',
			'spider_walk',
			'scarab_awake',
			'scarab_bite',
			'scarab_death',
			'scarab_horn',
			'scarab_wings',
			'mosquito_attack',
			'mosquito_death',
			'mosquito_loop',
			'bronze_gate_locked',
			'bat_attack',
			'bat_death',
			'progress_1',
			'progress_2',
			'progress_3',
			'progress_4',
			'progress_5',
			'progress_6',
			'progress_7',
			'progress_8',
			'progress_9',
			'life_gain',
			'player_death',
			'logo_full',
			'logo_short',
			'smithy_hammer',
			'sightstone_cast',
			'error',
			'ranting_tree_halt',
			'treasure_close',
			'treasure_item_pop',
			'treasure_item_show',
			'treasure_open',
			'skeleton_boss_awake',
			'skeleton_boss_hand_slam',
			'level_up',
			'insta_kill',
			'spider_boss_awake',
			'metal_drop',
			'treasure_drop',
			'smithy_hammer_fail',
			'xp_tick',
			'crossbow_cast',
			'crossbow_hit',
			'wand_aether_cast',
			'wand_aether_hit',
			'wand_air_cast',
			'wand_air_hit',
			'wand_fire_cast',
			'wand_fire_hit',
			'wand_ice_cast',
			'wand_ice_hit',
			'wand_poison_cast',
			'wand_poison_hit',
			'wand_vigor_cast',
			'wand_vigor_hit',
			'skeleton_boss_arm_reconnect',
			'skeleton_boss_summon_minions',
			'mushroom_boss_fat_slam',
			'pickup_bronze',
			'temple_npc_chant',
			'temple_npc_clear_throat',
			'temple_npc_talk',
			'first_controller',
			'slave_npc',
			'slave_outro_chatter',
			'slave_outro_voice',
			'haunted_gate_npc_voice',
			'slave_outro_transition',
			'bronze_guardian_attack1',
			'bronze_guardian_attack2',
			'bronze_guardian_attack3',
			'bronze_guardian_death',
			'bronze_guardian_helmet',
			'bronze_guardian_power_up',
			'bronze_guardian_steps',
			'ant_attack',
			'ant_death',
			'ant_walk',
			'snail_attack',
			'snail_attack_small',
			'snail_death',
			'snail_death_small',
			'snail_walk',
			'ghost_death',
			'ghost_death_small',
			'skeletimmy_death',
			'skeletony_death',
			'skeletimmy_attack',
			'skeletony_attack',
			'skeletony_awake_a',
			'skeletony_awake_b',
			'skeletony_walk',
			'ghost_loop',
			'ghost_loop_small',
			'ghost_attack',
			'ghost_attack_small',
			'controller_death',
			'controller_whip_attack',
			'controller_whip_hit',
			'dominotaur_death',
			'dominotaur_whip_attack',
			'dominotaur_whip_hit',
			'mine_walker_death',
			'mine_walker_attack_a',
			'mine_walker_attack_b',
			'mine_walker_attack_hit',
			'mine_walker_awake',
			'mine_walker_step',
			'fire_elemental_attack',
			'fire_elemental_attack_hit',
			'fire_elemental_awake',
			'fire_elemental_death',
			'mine_walker_helmet_break',
			'ice_elemental_attack',
			'ice_elemental_attack_hit',
			'ice_elemental_awake',
			'ice_elemental_death',
			'ki_eater_attack',
			'ki_eater_attack_hit',
			'ki_eater_awake',
			'ki_eater_death',
			'ki_gobbler_attack',
			'ki_gobbler_attack_hit',
			'ki_gobbler_awake',
			'ki_gobbler_death',
			'ki_slerper_attack',
			'ki_slerper_attack_hit',
			'ki_slerper_awake',
			'ki_slerper_death',
			'bell_ringer_attack',
			'bell_ringer_attack_hit',
			'cult_guard_attack',
			'cult_guard_attack_hit',
			'cult_marksman_attack',
			'cult_marksman_attack_hit',
			'cult_sorcerer_attack',
			'cult_sorcerer_attack_hit',
			'cultist_death',
			'flying_serpent_loop',
			'poison_adept_attack',
			'poison_adept_attack_hit',
			'serpent_attack',
			'serpent_death',
			'serpent_handler_release',
			'serpent_hiss',
			'serpent_slither',
			'worm_rider_hop',
			'booklet_open',
			'booklet_turn_page',
			'booklet_close',
			'hammer_cast',
			'hammer_hit',
			'shield_dash',
			'fissure_break_apart',
			'fissure_unmake',
			'mindstone_off',
			'mindstone_on',
			'triskelion_fuse',
			'potion_berserk',
			'potion_cleansing',
			'potion_defensive',
			'potion_experience',
			'potion_healing',
			'potion_invisibility',
			'potion_lightning',
			'potion_lucky',
			'potion_strength',
			'potion_vampiric',
			'bronze_guardian_pulling_hammer',
			'bronze_guardian_removing_hammer',
			'bronze_guardian_turbine',
			'bronze_guardian_ears_ring',
			'bronze_guardian_fuse',
			'bronze_guardian_attack4',
			'yeti_attack',
			'yeti_attack_flick',
			'yeti_attack_hit',
			'yeti_awake_blow',
			'yeti_awake_explosion',
			'yeti_awake_inhale',
			'yeti_awake_lick',
			'yeti_blow',
			'yeti_blow_ice_wall',
			'yeti_death',
			'yeti_inhale',
			'yeti_inhale_lick',
			'nagaraja_awake_roar',
			'nagaraja_awake_swallow',
			'nagaraja_awake_tongue_1',
			'nagaraja_awake_tongue_2',
			'nagaraja_dead',
			'nagaraja_poison_attack',
			'nagaraja_poison_attack_hit',
			'nagaraja_wail',
			'nagaraja_wail_brick',
			'nagaraja_attack_eat',
			'nagaraja_attack_lick',
			'nagaraja_attack_swallow',
			'nagaraja_tongue_damaged',
			'nagaraja_tongue_lift',
			'nagaraja_tongue_smell',
			'nagaraja_tongue_wrap',
			'bearer3_talk',
			'bearer_attack',
			'bearer_attack_hit',
			'bearer_death',
			'bearer_stealing',
			'bearer_super_attack',
			'bearer_scream',
			'bearer4_talk',
			'bearer4_talk_evolving',
			'bearer_evolving',
			'elementalist_aether_attack',
			'elementalist_aether_attack_hit',
			'elementalist_aether_blink',
			'elementalist_death',
			'elementalist_fire_attack',
			'elementalist_fire_attack_hit',
			'elementalist_fire_blink',
			'elementalist_ice_attack',
			'elementalist_ice_attack_hit',
			'elementalist_ice_blink',
			'elementalist_poison_attack',
			'elementalist_poison_attack_hit',
			'elementalist_poison_blink',
			'elementalist_vigor_attack',
			'elementalist_vigor_attack_hit',
			'elementalist_vigor_blink',
			'bearer5_talk',
			'elementalist_evolving',
			'perfected_attack',
			'perfected_attack_hit',
			'perfected_death',
			'perfected_defense',
			'perfected_energy_ball',
			'perfected_energy_ball_hit',
			'perfected_summon',
			'perfected_talk',
			'epilogue_devolving',
			'epliogue_player_evolves',
			'epilogue_talk',
			'devolved_talk',
			'dysangelos_guidance',
			'dysangelos_guidance_1',
			'dysangelos_guidance_2',
			'dysangelos_guidance_3',
			'dysangelos_intro_talk',
			'ranting_tree_talk_halt',
			'ranting_tree_talk_again',
			'ranting_tree_talk_how_dare',
			'ranting_tree_talk_avenge',
			'ranting_tree_talk_get_out',
			'ranting_tree_talk_impressive',
			'ranting_tree_talk_very_well',
			'ranting_tree_talk_extra',
			'hans_talk_intro',
			'hans_talk_reward',
			'scotty_a_pleasure',
			'scotty_a_worthy_opponent',
			'scotty_deuced',
			'scotty_failte_back',
			'scotty_getting_good',
			'scotty_grr',
			'scotty_guess_which',
			'scotty_intro',
			'scotty_lets_harden',
			'scotty_make_ye_guess',
			'scotty_noo_jist',
			'scotty_perhaps_the_rules',
			'scotty_pick_some_treasure',
			'scotty_shall_we_up',
			'scotty_we_have_wee_use',
			'scotty_well_met',
			'scotty_well_then',
			'scotty_wizard',
			'scotty_wrong_choice',
			'scotty_hell_be_back',
			'scotty_out_of_treasure',
			'scotty_there_he_is',
			'nagaraja_choir',
			'mushroom_boss_split',
			'ant_hill',
			'treasure_drop_common',
			'treasure_drop_epic',
			'treasure_drop_giant',
			'treasure_drop_humble',
			'treasure_drop_rare',
			'dominotaur_awake',
			'fire_geyser',
			'ice_pillar',
			'treasure_item_cyan',
			'treasure_item_yellow',
			'treasure_item_green',
			'treasure_item_blue',
			'treasure_item_red',
			'treasure_item_rainbow',
			'ki_slerper_walk',
			'mindstone_found',
			'ghost_tomb_death',
			'perfected_fly_start',
			'perfected_fly_loop',
			'perfected_fly_end',
			'shop_door_open',
			'shop_door_enter',
			'scorpion_death',
			'bomb_cart_explosion',
			'bomb_cart_fuse',
			'bomb_cart_move',
			'bronze_gate_close',
			'poison_powerup',
			'acronian_cultist_power_up',
			'giant_ice_elemental_attack',
			'scout_dialog',
			'morel_punch',
			'falling_stonefolk',
			'scout_arrives',
			'scout_leaves',
			'scout_wing',
			'scout_focus',
			'dog_bark',
			'frog',
			'lost_item_boost',
			'treasure_item_lost',
			'blade_glow',
			'blade_pallas_attack',
			'blade_raise',
			'blade_drag',
			'auggie_voice',
			'pallas_voice',
			'quest_stone_jump',
			'quest_stone_unlock',
			'bardiche_cast',
			'boo_voice',
			'quarterstaff_cast',
			'air_hiss',
			'bang_go_forward',
			'fire_orbs',
			'open_note',
			'talisman_reveal',
			'fire_beast_1',
			'fire_beast_2',
			'uulaa_voice',
			'mask_summon_1'
		]
	}

	if (/(\bmusic\.Play\()/g.test(lineText)) {
		dependencies = [
			'bronze_guardian_3',
			'bronze_guardian_4',
			'bronze_guardian_5',
			'bronze_guardian_cyan',
			'bronze_mine_0',
			'bronze_mine_1',
			'bronze_mine_2',
			'bronze_mine_3',
			'bronze_mine_4',
			'bronze_mine_5',
			'bronze_mine_cyan',
			'slave_outro_climb',
			'slave_outro_loop',
			'caustic_caves',
			'spider_boss',
			'cross_deadwood_river',
			'cross_deadwood_wind',
			'deadwood_0',
			'deadwood_1',
			'deadwood_2',
			'deadwood_3',
			'deadwood_4',
			'deadwood_5',
			'deadwood_cyan',
			'tree_boss',
			'waterfall_descent',
			'skeleton_boss',
			'undead_crypt_0',
			'undead_crypt_1',
			'undead_crypt_2',
			'undead_crypt_3',
			'undead_crypt_4',
			'undead_crypt_5',
			'undead_crypt_cyan',
			'undead_crypt_intro',
			'bridge_broken',
			'bridge_crossing',
			'icy_ridge_0',
			'icy_ridge_1',
			'icy_ridge_2',
			'icy_ridge_3',
			'icy_ridge_4',
			'icy_ridge_5',
			'icy_ridge_cyan',
			'yeti',
			'fire_loop',
			'fungus_forest_0',
			'fungus_forest_1',
			'fungus_forest_2',
			'fungus_forest_3',
			'fungus_forest_4',
			'fungus_forest_5',
			'fungus_forest_cyan',
			'mushroom_boss',
			'mushroom_boss_cyan',
			'shop',
			'rocky_plateau_0',
			'rocky_plateau_1',
			'rocky_plateau_2',
			'rocky_plateau_3',
			'rocky_plateau_4',
			'rocky_plateau_5',
			'rocky_plateau_epilogue',
			'rocky_plateau_fight',
			'rocky_plateau_talk',
			'nagaraja',
			'temple_0',
			'temple_1',
			'temple_2',
			'temple_3',
			'temple_4',
			'temple_5',
			'temple_cyan',
			'event_fall',
			'event_hamartia',
			'event_spring',
			'event_stonejam',
			'event_summer',
			'event_winter',
			'credits',
			'main_menu',
			'bone_factory',
			'osteophone',
			'uulaa'
		]
	}

	if (/(\bambient\.Add\()/g.test(lineText)) {
		dependencies = [
			'ambient_mines',
			'ambient_caves',
			'ambient_bronze_gate',
			'ambient_deadwood',
			'ambient_mushroom',
			'ambient_bridge',
			'ambient_icy',
			'ambient_cave',
			'ambient_rocky',
			'ambient_temple',
			'ambient_crypt',
			'ambient_haunted_gate',
			'ambient_pallas',
			'waterfall_a',
			'waterfall_b',
			'waterfall_c',
		]
	}

	if (/(\bloc\.$|\bloc\.\w+$)/g.test(lineText)) {
		dependencies = [
			'id',
			'name',
			'stars',
			'begin',
			'loop',
			'isQuest',
			'averageTime',
			'bestTime',
			{ name: 'Leave()', snippet: 'Leave()', type: vscode.CompletionItemKind.Function },
			{ name: 'Pause()', snippet: 'Pause()',type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bui\.$|\bui\.\w+$)/g.test(lineText)) {
		dependencies = [
			'root',
			{name : 'AddAnim()', snippet: 'AddAnim($0)', type: vscode.CompletionItemKind.Function },
			{name : 'AddButton()', snippet: 'AddButton()', type: vscode.CompletionItemKind.Function },
			{name : 'AddPanel()', snippet: 'AddPanel()', type: vscode.CompletionItemKind.Function },
			{name : 'AddStyle()', snippet: 'AddStyle($0)', type: vscode.CompletionItemKind.Function },
			{name : 'AddText()', snippet: 'AddText($0)', type: vscode.CompletionItemKind.Function },
			{name : 'AddCanvas()', snippet: 'AddCanvas()', type: vscode.CompletionItemKind.Function },
			{name : 'Clear()', snippet: 'Clear()', type: vscode.CompletionItemKind.Function },
			{name : 'ShowBanner()', snippet: 'ShowBanner($0)', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bsys\.$|\bsys\.\w+$)/g.test(lineText)) {
		dependencies = [
			'cacheRemoteFiles',
			'fileUrl',
			{name : 'SetFileUrl()', snippet: 'SetFileUrl($0)', type: vscode.CompletionItemKind.Function },
		]
	}

	if (/(\bkey\.$|\bkey\.\w+$)/g.test(lineText)) {
		dependencies = [
			{name : 'Bind()', snippet: 'Bind($0)', type: vscode.CompletionItemKind.Function },
			{name : 'GetKeyAct()', snippet: 'GetKeyAct($0)', type: vscode.CompletionItemKind.Function },
			{name : 'GetActKey()', snippet: 'GetActKey($0)', type: vscode.CompletionItemKind.Function },
			{name : 'GetActKey2()', snippet: 'GetActKey2($0)', type: vscode.CompletionItemKind.Function },
			{name : 'GetActLabel()', snippet: 'GetActLabel($0)', type: vscode.CompletionItemKind.Function },
			{name : 'ResetBinds()', snippet: 'ResetBinds()', type: vscode.CompletionItemKind.Function },
		]
	}

	if (/(\bstonescript\.$|\bstonescript\.\w+$)/g.test(lineText)) {
		dependencies = [
			{name : 'SetMaxExecutionTime()', snippet: 'SetMaxExecutionTime($0)', type: vscode.CompletionItemKind.Function },
		]
	}
	
	if (/(\bsummon\.$|\bsummon\.\w+$)/g.test(lineText)) {
		dependencies = [
			'count',
			{name : 'GetId()', snippet: 'GetId()', type: vscode.CompletionItemKind.Function },
			{name : 'GetName()', snippet: 'GetName()', type: vscode.CompletionItemKind.Function },
			{name : 'GetVar()', snippet: 'GetVar($0)', type: vscode.CompletionItemKind.Function },
			{name : 'GetState()', snippet: 'GetState()', type: vscode.CompletionItemKind.Function },
			{name : 'GetTime()', snippet: 'GetTime()', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/\.(d|a)x/g.test(lineText)) {
		dependencies = [
			'center',
			'left',
			'right'
		]
	}
	
	if (/\.(d|a)y/g.test(lineText)) {
		dependencies = [
			'center',
			'top',
			'bottom'
		]
	}

	if (/\.(anchor|dock) *= */g.test(lineText)) {
		dependencies = [
			'top_left',
			'top_center',
			'top_right',
			'center_left',
			'center_center',
			'center_right',
			'bottom_left',
			'bottom_center',
			'bottom_right'
		]
	}

	if (/\.visible/g.test(lineText)) {
		dependencies = [
			'true',
			'false',
			'inherit'
		]
	}

	if (/(\bcolor\.$|\bcolor\.\w+$)/g.test(lineText)) {
		dependencies = [
			{name : 'FromRGB()', snippet: 'FromRGB(${1:r}, ${2:g}, ${3:b})', type: vscode.CompletionItemKind.Function },
			{name : 'ToRGB()', snippet: 'ToRGB($0)', type: vscode.CompletionItemKind.Function },
			{name : 'Lerp()', snippet: 'Lerp(${1:c1}, ${2:c2}, ${3:t})', type: vscode.CompletionItemKind.Function },
			{name : 'Random()', snippet: 'Random()', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bfoe\.$|\bfoe\.\w+$)/g.test(lineText)) {
		dependencies = ['name', 'distance', 'count', 'hp', 'maxhp', 'armor', 'maxarmor', 'buffs', 'debuffs', 'state', 'time', 'level']
	}

	if (/(\bitem\.$|\bitem\.\w+$)/g.test(lineText)) {
		dependencies = [
			'left',
			'right',
			'left.id',
			'right.id',
			'potion',
			{ name: 'CanActivate()', snippet: 'CanActivate($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'GetCooldown()', snippet: 'GetCooldown(${1|"bardiche","bash","blade","mask","dash","hatchet","hammer","mind","quarterstaff","skeleton_arm"|})$0', type: vscode.CompletionItemKind.Function },
			{ name: 'GetCount()', snippet: 'GetCount($0)', type: vscode.CompletionItemKind.Function }
		]
	}
	
	if (/(\bint\.$|\bint\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Parse()', snippet: 'Parse($0)', type: vscode.CompletionItemKind.Function},
		]
	}

	if (/(\bharvest\.$|\bharvest\.\w+$)/g.test(lineText)) {
		dependencies = ['distance']
	}

	if (/(\bpickup\.$|\bpickup\.\w+$)/g.test(lineText)) {
		dependencies = ['distance']
	}

	if (/(\barmor\.$|\barmor\.\w+$)/g.test(lineText)) {
		dependencies = ['f']
	}

	if (/(\bpos\.$|\bpos\.\w+$)/g.test(lineText)) {
		dependencies = ['x', 'y', 'z']
	}

	if (/(\bai\.$|\bai\.\w+$)/g.test(lineText)) {
		dependencies = ['enabled', 'paused', 'idle', 'walking']
	}

	if (/(\bres\.$|\bres\.\w+$)/g.test(lineText)) {
		dependencies = ['stone', 'wood', 'tar', 'ki', 'bronze', 'crystals']
	}

	if (/(\bplayer\.$|\bplayer\.\w+$)/g.test(lineText)) {
		dependencies = ['direction', 'name', { name: 'ShowScaredFace()', snippet: 'ShowScaredFace($0)', type: vscode.CompletionItemKind.Function }]
	}

	if (/(\binput\.$|\binput\.\w+$)/g.test(lineText)) {
		dependencies = ['x', 'y']
	}

	if (/(\bscreen\.$|\bscreen\.\w+$)/g.test(lineText)) {
		dependencies = [
			'i',
			'x',
			'w',
			'h',
			{ name: 'FromWorldX()', snippet: 'FromWorldX($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'FromWorldZ()', snippet: 'FromWorldX($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'ToWorldX()', snippet: 'ToWoldZ($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'ToWorldZ()', snippet: 'ToWorldZ($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Next()', snippet: 'Next()', type: vscode.CompletionItemKind.Function },
			{ name: 'Previous()', snippet: 'Previous()', type: vscode.CompletionItemKind.Function },
			{ name: 'ResetOffset()', snippet: 'ResetOffset()', type: vscode.CompletionItemKind.Function }
		]
	}
	
	if (/(\btime\.$|\btime\.\w+$)/g.test(lineText)) {
		dependencies = [
			'ms',
			'year',
			'month',
			'day',
			'hour',
			'minute',
			'second',
			{ name: 'FormatCasual()', snippet: 'FormatCasual($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'FormatDigital()', snippet: 'FormatDigital($0)', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\butc\.$|\butc\.\w+$)/g.test(lineText)) {
		dependencies = ['year', 'month', 'day', 'hour', 'minute', 'second']
	}

	if (/\b(enable|disable) \w+$/g.test(lineText)) {
		dependencies = ['abilities', 'banner', 'hud', 'loadout input', 'loadout print',  'pause', 'player']
	}

	if (/(\bmath\.$|\bmath\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Abs()', snippet: 'Abs($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Sign()', snippet: 'Sign($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Min()', snippet: 'Min(${1:num1}, ${2:num2})', type: vscode.CompletionItemKind.Function },
			{ name: 'Max()', snippet: 'Max(${1:num1}, ${2:num2})', type: vscode.CompletionItemKind.Function },
			{ name: 'Clamp()', snippet: 'Clamp(${1:num}, ${2:min}, ${3:max})', type: vscode.CompletionItemKind.Function },
			{ name: 'Round()', snippet: 'Round($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'RoundToInt()', snippet: 'RoundToInt($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Floor()', snippet: 'Floor($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'FloorToInt()', snippet: 'FloorToInt($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Ceil()', snippet: 'Ceil($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'CeilToInt()', snippet: 'CeilToInt($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Lerp()', snippet: 'Lerp(${1:a}, ${2:b}, ${3:t})', type: vscode.CompletionItemKind.Function },
			{ name: 'Log()', snippet: 'Log(${1:num}, ${2:base})', type: vscode.CompletionItemKind.Function },
			{ name: 'Pow()', snippet: 'Pow(${1:num}, ${2:p})', type: vscode.CompletionItemKind.Function },
			{ name: 'Sqrt()', snippet: 'Sqrt($0)', type: vscode.CompletionItemKind.Function },
			'pi',
			{ name: 'ToDeg()', snippet: 'ToDeg($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'ToRad()', snippet: 'ToRad($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Acos()', snippet: 'Acos($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Asin()', snippet: 'Asin($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Atan()', snippet: 'Atan($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Cos()', snippet: 'Cos($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Sin()', snippet: 'Sin($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Tan()', snippet: 'Tan($0)', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bmusic\.$|\bmusic\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Play()', snippet: 'Play($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Stop()', snippet: 'Stop()', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bambient\.$|\bambient\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Add()', snippet: 'Add($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Stop()', snippet: 'Stop()', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bstorage\.$|\bstorage\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Delete()', snippet: 'Delete($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Get()', snippet: 'Get($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Has()', snippet: 'Has($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Keys()', snippet: 'Keys()', type: vscode.CompletionItemKind.Function },
			{ name: 'Incr()', snippet: 'Incr($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Set()', snippet: 'Set(${1:string}, ${2:value})', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bstring\.$|\bstring\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Break()', snippet: 'Break(${1:str}, ${2:int})', type: vscode.CompletionItemKind.Function },
			{ name: 'Capitalize()', snippet: 'Capitalize($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Equals()', snippet: 'Equals(${1:str1}, ${2:str2})', type: vscode.CompletionItemKind.Function },
			{ name: 'Format()', snippet: 'Format($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'IndexOf()', snippet: 'IndexOf(${1:str}, ${2:criteria})', type: vscode.CompletionItemKind.Function },
			{ name: 'Join()', snippet: 'Join(${1:s}, ${2:arr})', type: vscode.CompletionItemKind.Function },
			{ name: 'Size()', snippet: 'Size($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Split()', snippet: 'Split($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Sub()', snippet: 'Sub(${1:str}, ${2:startAt})', type: vscode.CompletionItemKind.Function },
			{ name: 'ToLower()', snippet: 'ToLower($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'ToUpper()', snippet: 'ToUpper($0)', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/(\bte\.$|\bte\.\w+$)/g.test(lineText)) {
		dependencies = [
			'language',
			{ name: 'xt()', snippet: 'xt($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'GetTID()', snippet: 'GetTID($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'ToEnglish()', snippet: 'ToEnglish($0)', type: vscode.CompletionItemKind.Function }
		]
	}
	
	if (/(\[.*\]\.$|\[.*\]\.\w+$)/g.test(lineText)) {
		dependencies = [
			{ name: 'Add()', snippet: 'Add($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Clear()', snippet: 'Clear()', type: vscode.CompletionItemKind.Function },
			{ name: 'Contains()', snippet: 'Contains($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Count()', snippet: 'Count()', type: vscode.CompletionItemKind.Function },
			{ name: 'Emplace()', snippet: 'Emplace($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'IndexOf()', snippet: 'IndexOf($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Insert()', snippet: 'Insert($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'RemoveAt()', snippet: 'RemoveAt($0)', type: vscode.CompletionItemKind.Function },
			{ name: 'Sort()', snippet: 'Sort()', type: vscode.CompletionItemKind.Function }
		]
	}

	if (/\b(var|func)\b *(\w+)?$/g.test(lineText)) {
		dependencies = ['']
	}

	var clear_document
	clear_document = document.getText().replace(/^ *\/\*(.|\n)*?\*\/|\/\/.+$/gm, '')
	
	// functions completion
	functions = clear_document.match(/^ *func .+(?=\(|$)/gm)
	if (functions != null && /\b(func)\b *(\w+)?$/g.test(lineText) == false) {
		functions.map(i => {
			func_name = i.split('func ')[1].replace(/\s/g, '')
			func_content = func_name.split('(')[1]
			func_name = func_name.split('(')[0]

			if (/(\w+\.\w+$|\w+\.$|\.\.$)/g.test(lineText) == false) {
				if (func_content.indexOf(')') == 0) {
					dependencies.push({ name: func_name + '()', snippet: func_name + '()', type: vscode.CompletionItemKind.Function })
				} else {
					dependencies.push({ name: func_name + '()', snippet: func_name + '($0)', type: vscode.CompletionItemKind.Function })
				}
			}
		})
	}
	
	// variables completion and ui.Add... elements
	variables = clear_document.match(/^ *var .+$/gm)
	var re
	if (variables != null && /\b(var)\b *(\w+)?$/g.test(lineText) == false) {
		variables.map(i => {
			var_name = i.split('var ')[1].replace(/\s/g, '')
			var_content = var_name.split('=')[1]
			var_name = var_name.split('=')[0]
			
			if (var_content == undefined) {
				re = new RegExp('^ *' + var_name + ' *= *.*$', 'gm')
				var_content = document.getText().match(re)
				var_content = var_content[var_content.length-1].split('=')[1]
				var_content = var_content.replace(/\s/g, '')
			}

			re = new RegExp('(\\b' + var_name + '\\.$)|(\\b' + var_name + '\\.\\w+$)', 'g')
			if (re.test(lineText)) {
				if (var_content.indexOf('ui.Add') == 0) {
					dependencies.push(
						'x',
						'y',
						'w',
						'h',
						'absoluteX',
						'absoluteY',
						'anchor',
						'dock',
						'ax',
						'ay',
						'dx',
						'dy',
						'parent',
						'visible',
						{ name: 'Recycle()', snippet: 'Recycle()', type: vscode.CompletionItemKind.Function }
						)	
				}
	
				if (var_content.indexOf('ui.AddPanel()') == 0) {
					dependencies.push(
						'children',
						'clip',
						'color',
						'style',
						{ name: 'Add()', snippet: 'Add($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'Clear()', snippet: 'Clear()', type: vscode.CompletionItemKind.Function },
						{ name: 'Remove()', snippet: 'Remove($0)', type: vscode.CompletionItemKind.Function }
						)	
				}
	
				if (var_content.indexOf('ui.AddText(') == 0) {
					dependencies.push(
						'align',
						'color',
						'lines',
						'text'
						)	
				}
	
				if (var_content.indexOf('ui.AddButton()') == 0) {
					dependencies.push(
						'text',
						'tcolor',
						'bcolor',
						'hcolor',
						'sound',
						'style',
						{ name: 'SetPressed()', snippet: 'SetPressed($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'SetDown()', snippet: 'SetDown($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'SetUp()', snippet: 'SetUp($0)', type: vscode.CompletionItemKind.Function }
						)	
				}
	
				if (var_content.indexOf('ui.AddAnim(') == 0) {
					dependencies.push(
						'color',
						'duration',
						'flipX',
						'flipY',
						'frame',
						'gamePause',
						'loop',
						'playing',
						'paused',
						'pivotX',
						'pivotY',
						'playOnStart',
						{ name: 'Load()', snippet: 'Load($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'Pause()', snippet: 'Pause()', type: vscode.CompletionItemKind.Function },
						{ name: 'Play()', snippet: 'Play()', type: vscode.CompletionItemKind.Function },
						{ name: 'Stop()', snippet: 'Stop()', type: vscode.CompletionItemKind.Function }
						)
				}
	
				if (var_content.indexOf('ui.AddCanvas()') == 0) {
					dependencies.push(
						'blend',
						{ name: 'Get()', snippet: 'Get($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'Set()', snippet: 'Set($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'SetFG()', snippet: 'SetFG($0)', type: vscode.CompletionItemKind.Function },
						{ name: 'SetBG()', snippet: 'SetBG($0)', type: vscode.CompletionItemKind.Function }
						)
				}

				if (var_content.indexOf('[') == 0 || var_content.indexOf('string.Split(') == 0) {
                    dependencies.push(
                        { name: 'Add()', snippet: 'Add($0)', type: vscode.CompletionItemKind.Function },
                        { name: 'Clear()', snippet: 'Clear()', type: vscode.CompletionItemKind.Function },
                        { name: 'Contains()', snippet: 'Contains($0)', type: vscode.CompletionItemKind.Function },
                        { name: 'Count()', snippet: 'Count()', type: vscode.CompletionItemKind.Function },
                        { name: 'Emplace()', snippet: 'Emplace($0)', type: vscode.CompletionItemKind.Function },
                        { name: 'IndexOf()', snippet: 'IndexOf($0)', type: vscode.CompletionItemKind.Function },
                        { name: 'Insert()', snippet: 'Insert($0)', type: vscode.CompletionItemKind.Function },
                        { name: 'RemoveAt()', snippet: 'RemoveAt($0)', type: vscode.CompletionItemKind.Function },
                        { name: 'Sort()', snippet: 'Sort()', type: vscode.CompletionItemKind.Function }
                        )
                }
			}
			
			if (/(\w+\.\w+$|\w+\.$|\.\.$)/g.test(lineText) == false) {
				dependencies.push({ name: var_name, snippet: var_name, type: vscode.CompletionItemKind.Variable }
				)
			}
		})
	}
	
	if (dependencies == []) { return null }
	return dependencies.map(dep => {
		if (typeof dep == 'object') {
			const item = new vscode.CompletionItem(dep.name, dep.type)
			item.insertText = new vscode.SnippetString(dep.snippet)
			return item
		} else {
			return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field)
		}
	})
}

/**
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item, token) {
	return null
}

module.exports = function (context) {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			'stonescript',
			{
				provideCompletionItems,
				resolveCompletionItem
			},
			'.'
		)
	)
}