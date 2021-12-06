import {
    MonsterAbility,
    MonsterBodyPart,
    MonsterClass,
    MonsterShortInfo,
    MonsterStats,
    SaleInfo,
} from '../typings/monster'

export default class Monster {
    private id: string = ''
    private name: string = ''
    private img: string = ''
    private owner: string = ''
    private level: number
    private birth_day: number
    private value: number
    private gene: string
    private sale_info: SaleInfo
    private stats: MonsterStats
    private class: MonsterClass = MonsterClass.Dragon
    private abilities: MonsterAbility[] = []
    private body: MonsterBodyPart[] = []
    private children?: MonsterShortInfo[] = []
    private parent?: MonsterShortInfo[] = []
    private breed_count: number = 0

    constructor(
        id: string,
        name: string,
        img: string,
        owner: string,
        parent?: MonsterShortInfo[],
        stats?: MonsterStats
    ) {
        this.id = id
        this.name = name
        this.img = img
        this.owner = owner
        this.birth_day = new Date().getTime()

        if (parent) {
            this.parent = parent
            const gene1 = parent[0].gene
            const gene2 = parent[1].gene
            this.gene =
                '0x' + gene1
                    ? gene1.substring(0, gene1.length - 1)
                    : this.make_random_gene(64) + gene2
                    ? gene2.substring(0, gene2.length - 1)
                    : this.make_random_gene(64)
        } else {
            this.gene = this.make_random_gene(128)
        }

        if (stats) {
            this.stats = stats
        }

        this.birth_day = new Date().getTime()
    }
    get _sale_info(): SaleInfo {
        return this.sale_info
    }

    get _id() {
        return this.id
    }

    set _sale_info(_info: SaleInfo) {
        this.sale_info = _info
    }

    get _value() {
        return this.value
    }

    get _name() {
        return this.name
    }

    get _img() {
        return this.img
    }

    get _class() {
        return this.class
    }

    get _level() {
        return this.level
    }

    get _gene() {
        return this.gene
    }

    get _owner() {
        return this.owner
    }

    get _body() {
        return this.body
    }

    get _stats() {
        return this.stats
    }

    get _children() {
        return this.children
    }
    get _parent() {
        return this.parent
    }
    get _abilities() {
        return this.abilities
    }

    get _breed_count() {
        return this.breed_count
    }

    get _birth_day() {
        return this.birth_day
    }

    make_random_gene(length: number) {
        let gene = ''
        const nuclear_ot = ['a', 't', 'g', 'x']

        for (let i = 0; i < length; i++) {
            const element = nuclear_ot[Math.floor(Math.random() * 4)]
            gene += element
        }

        return gene
    }

    get _info() {
        return {
            id: this._id,
            name: this._name,
            img: this._img,
            owner: this._owner,
            level: this._level,
            birth_day: this._birth_day,
            value: this._value,
            gene: this._gene,
            sale_info: this._sale_info,
            stats: this._stats,
            class: this._class,
            abilities: this._abilities,
            body: this._body,
            children: this._children,
            parent: this._parent,
            breed_count: this.breed_count,
        }
    }
}
